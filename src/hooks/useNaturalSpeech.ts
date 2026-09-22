import { pronunciationConfigAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'

const femaleHints = [
  'aria',
  'ava',
  'emma',
  'jenny',
  'michelle',
  'samantha',
  'serena',
  'sonia',
  'karen',
  'tessa',
  'moira',
  'victoria',
  'fiona',
  'zira',
]
const maleHints = [
  'andrew',
  'brian',
  'christopher',
  'daniel',
  'davis',
  'guy',
  'jason',
  'liam',
  'oliver',
  'ryan',
  'thomas',
  'aaron',
  'arthur',
  'alex',
  'tom',
]
const qualityHints = [
  'natural',
  'neural',
  'premium',
  'enhanced',
  'microsoft',
  'google',
  'apple',
]
const lowQualityHints = [
  'espeak',
  'compact',
  'festival',
  'novelty',
  'zarvox',
  'whisper',
  'trinoids',
  'boing',
  'bubbles',
  'cellos',
  'pipe organ',
]

export type SpeechProfile = 'default' | 'sgd'

export function useSpeechVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  useEffect(() => {
    if (!window.speechSynthesis) return
    const load = () => setVoices(window.speechSynthesis.getVoices())
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])
  return voices
}

function hasAny(name: string, hints: string[]) {
  return hints.some((hint) => name.includes(hint))
}

export function scoreSpeechVoice(voice: SpeechSynthesisVoice, gender?: Word['gender']) {
  const name = voice.name.toLowerCase()
  const lang = voice.lang.toLowerCase()
  let score = 0

  if (lang.startsWith('en-us')) score += 45
  else if (lang.startsWith('en-gb')) score += 42
  else if (lang.startsWith('en-au')) score += 40
  else if (lang.startsWith('en')) score += 30
  else score -= 100

  if (name.includes('natural')) score += 70
  if (name.includes('neural')) score += 65
  if (name.includes('premium')) score += 50
  if (name.includes('enhanced')) score += 45
  if (hasAny(name, qualityHints)) score += 18
  if (hasAny(name, lowQualityHints)) score -= 120

  if (gender === 'She') {
    if (hasAny(name, femaleHints)) score += 35
    if (hasAny(name, maleHints)) score -= 12
  }
  if (gender === 'He') {
    if (hasAny(name, maleHints)) score += 35
    if (hasAny(name, femaleHints)) score -= 12
  }

  // 浏览器的云端 Natural voice 往往 localService=false，不再像旧版一样偏爱本地老声线。
  return score
}

export function sortedEnglishVoices(voices: SpeechSynthesisVoice[], gender?: Word['gender']) {
  return [...voices]
    .filter((voice) => voice.lang.toLowerCase().startsWith('en'))
    .sort((a, b) => scoreSpeechVoice(b, gender) - scoreSpeechVoice(a, gender) || a.name.localeCompare(b.name))
}

function speakerSlot(speaker?: string) {
  const match = speaker?.match(/(\d+)/)
  const n = match ? Number(match[1]) : 1
  return Number.isFinite(n) && n > 0 ? n - 1 : 0
}

function configuredSgdVoiceName(config: Record<string, unknown>, speaker?: string) {
  if (speaker === 'S2') return String(config.sgdVoiceS2 || 'auto')
  if (speaker === 'S3') return String(config.sgdVoiceS3 || 'auto')
  return String(config.sgdVoiceS1 || 'auto')
}

function normalizeSpeechText(text: string, profile: SpeechProfile) {
  const clean = text.trim().replace(/\s+/g, ' ')
  if (!clean) return clean
  if (profile !== 'sgd') return clean
  // SGD 九宫格里很多是短语片段。补一个轻量句末停顿能显著减少“机器人连续念词组”的感觉。
  return /[.!?…]$/.test(clean) ? clean : `${clean}.`
}

export default function useNaturalSpeech(
  text: string,
  gender?: Word['gender'],
  speaker?: string,
  profile: SpeechProfile = 'default',
) {
  const config = useAtomValue(pronunciationConfigAtom)
  const voices = useSpeechVoices()
  const [speaking, setSpeaking] = useState(false)

  const voice = useMemo(() => {
    if (!voices.length) return undefined

    const requestedName =
      profile === 'sgd'
        ? configuredSgdVoiceName(config as unknown as Record<string, unknown>, speaker)
        : config.ttsVoiceName || 'auto'

    if (requestedName !== 'auto') {
      const selected = voices.find((candidate) => candidate.name === requestedName)
      if (selected) return selected
    }

    const ranked = sortedEnglishVoices(voices, gender)
    if (!ranked.length) return undefined

    if (profile === 'sgd') {
      // 自动模式下让 S1 / S2 / S3 尽量使用不同的高质量声线，避免三个人听起来像同一个机器人。
      const slot = speakerSlot(speaker)
      return ranked[Math.min(slot, ranked.length - 1)] || ranked[0]
    }

    return ranked[0]
  }, [config, gender, profile, speaker, voices])

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const play = useCallback(() => {
    if (!window.speechSynthesis || !text) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(normalizeSpeechText(text, profile))
    utterance.lang = voice?.lang || 'en-US'
    if (voice) utterance.voice = voice

    const selectedRate = profile === 'sgd' ? config.sgdRate || 0.92 : config.rate || 1
    utterance.rate = Math.max(0.65, Math.min(selectedRate, 1.35))
    utterance.volume = config.volume
    // 不再用 pitch 强行模拟男女声；高/低音处理反而是旧版 SGD “怪声”的主要来源之一。
    utterance.pitch = 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [config.rate, config.sgdRate, config.volume, profile, text, voice])

  useEffect(() => stop, [stop, text])

  return { play, stop, isPlaying: speaking, voice, voices }
}
