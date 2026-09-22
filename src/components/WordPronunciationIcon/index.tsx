import { SoundIcon } from './SoundIcon'
import useNaturalSpeech from '@/hooks/useNaturalSpeech'
import usePronunciationSound from '@/hooks/usePronunciation'
import type { Word } from '@/typings'
import { useCallback, useEffect, useImperativeHandle } from 'react'
import React from 'react'

export const WordPronunciationIcon = React.forwardRef<
  WordPronunciationIconRef,
  { word: Word; lang: string; className?: string; iconClassName?: string }
>(({ word, lang, className, iconClassName }, ref) => {
  const currentWord = () => {
    if (lang === 'hapin') {
      if (/[\u0400-\u04FF]/.test(word.notation || '')) return word.notation || ''
      return word.trans[2]
    }
    return word.name
  }

  // PTE 训练永远使用单次发音：即使旧版 localStorage 里开过“循环发音”，
  // 也不能让当前训练项无限循环。
  const remote = usePronunciationSound(currentWord(), false, word.ttsEngine === 'browser' ? undefined : word.audio)
  const natural = useNaturalSpeech(currentWord(), word.gender, word.speaker, word.mode === 'sgd' ? 'sgd' : 'default')
  const useNatural = word.ttsEngine === 'browser' || word.mode === 'sgd' || word.mode === 'sst'
  const { play: playRemote, stop: stopRemote, isPlaying: remoteIsPlaying } = remote
  const { play: playNatural, stop: stopNatural, isPlaying: naturalIsPlaying } = natural

  const playSound = useCallback(() => {
    stopRemote()
    stopNatural()
    if (useNatural) playNatural()
    else playRemote()
  }, [playNatural, playRemote, stopNatural, stopRemote, useNatural])

  useEffect(
    () => () => {
      stopRemote()
      stopNatural()
    },
    [stopNatural, stopRemote, word.name],
  )

  useImperativeHandle(ref, () => ({ play: playSound }), [playSound])

  return (
    <SoundIcon
      animated={useNatural ? naturalIsPlaying : remoteIsPlaying}
      onClick={playSound}
      className={`cursor-pointer text-gray-600 ${className}`}
      iconClassName={iconClassName}
    />
  )
})

WordPronunciationIcon.displayName = 'WordPronunciationIcon'

export type WordPronunciationIconRef = { play: () => void }
