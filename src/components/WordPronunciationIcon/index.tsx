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

  const remote = usePronunciationSound(currentWord(), undefined, word.ttsEngine === 'browser' ? undefined : word.audio)
  const natural = useNaturalSpeech(currentWord(), word.gender)
  const useNatural = word.ttsEngine === 'browser' || word.mode === 'sgd' || word.mode === 'sst'

  const playSound = useCallback(() => {
    remote.stop()
    natural.stop()
    if (useNatural) natural.play()
    else remote.play()
  }, [natural, remote, useNatural])

  useEffect(() => () => {
    remote.stop()
    natural.stop()
  }, [word, remote.stop, natural.stop])

  useImperativeHandle(ref, () => ({ play: playSound }), [playSound])

  return (
    <SoundIcon
      animated={useNatural ? natural.isPlaying : remote.isPlaying}
      onClick={playSound}
      className={`cursor-pointer text-gray-600 ${className}`}
      iconClassName={iconClassName}
    />
  )
})

WordPronunciationIcon.displayName = 'WordPronunciationIcon'

export type WordPronunciationIconRef = { play: () => void }
