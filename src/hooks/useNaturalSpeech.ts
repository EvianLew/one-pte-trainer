import { pronunciationConfigAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'

const femaleHints = ['ava', 'samantha', 'serena', 'karen', 'tessa', 'moira', 'zira', 'jenny', 'aria', 'susan', 'victoria', 'fiona']
const maleHints = ['andrew', 'daniel', 'alex', 'tom', 'guy', 'ryan', 'oliver', 'eddy', 'fred', 'aaron', 'arthur']
const qualityHints = ['natural', 'premium', 'enhanced', 'microsoft', 'apple', 'google']

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

function scoreVoice(voice: SpeechSynthesisVoice, gender?: Word['gender']) {
  const name = voice.name.toLowerCase()
  const lang = voice.lang.toLowerCase()
  let score = 0
  if (lang.startsWith('en-us')) score += 40
  else if (lang.startsWith('en-gb')) score += 35
  else if (lang.startsWith('en')) score += 25
  if (qualityHints.some((x) => name.includes(x))) score += 18
  if (gender === 'She' && femaleHints.some((x) => name.includes(x))) score += 30
  if (gender === 'He' && maleHints.some((x) => name.includes(x))) score += 30
  if (voice.localService) score += 5
  return score
}

export default function useNaturalSpeech(text: string, gender?: Word['gender']) {
  const config = useAtomValue(pronunciationConfigAtom)
  const voices = useSpeechVoices()
  const [speaking, setSpeaking] = useState(false)

  const voice = useMemo(() => {
    if (!voices.length) return undefined
    if (config.ttsVoiceName && config.ttsVoiceName !== 'auto') {
      const selected = voices.find((v) => v.name === config.ttsVoiceName)
      if (selected) return selected
    }
    return [...voices]
      .filter((v) => v.lang.toLowerCase().startsWith('en'))
      .sort((a, b) => scoreVoice(b, gender) - scoreVoice(a, gender))[0]
  }, [config.ttsVoiceName, gender, voices])

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const play = useCallback(() => {
    if (!window.speechSynthesis || !text) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = voice?.lang || 'en-US'
    if (voice) utterance.voice = voice
    utterance.rate = Math.max(0.55, Math.min(config.rate || 1, 1.6))
    utterance.volume = config.volume
    utterance.pitch = gender === 'She' ? 1.03 : gender === 'He' ? 0.96 : 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }, [config.rate, config.volume, gender, text, voice])

  useEffect(() => stop, [stop, text])

  return { play, stop, isPlaying: speaking, voice, voices }
}
