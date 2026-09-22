import { TypingContext, TypingStateActionType } from '../../store'
import type { TypingState } from '../../store/type'
import PrevAndNextWord from '../PrevAndNextWord'
import Progress from '../Progress'
import Phonetic from './components/Phonetic'
import Translation from './components/Translation'
import StudyContext from './components/StudyContext'
import WordComponent from './components/Word'
import { usePrefetchPronunciationSound } from '@/hooks/usePronunciation'
import { isReviewModeAtom, isShowPrevAndNextWordAtom, loopWordConfigAtom, phoneticConfigAtom, reviewModeInfoAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function WordPanel() {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(TypingContext)!
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const isShowPrevAndNextWord = useAtomValue(isShowPrevAndNextWordAtom)
  const [wordComponentKey, setWordComponentKey] = useState(0)
  const [currentWordExerciseCount, setCurrentWordExerciseCount] = useState(0)
  const { times: loopWordTimes } = useAtomValue(loopWordConfigAtom)
  const currentWord = state.chapterData.words[state.chapterData.index]
  const previousWord = state.chapterData.words[state.chapterData.index - 1] as Word | undefined
  const nextWord = state.chapterData.words[state.chapterData.index + 1] as Word | undefined

  const setReviewModeInfo = useSetAtom(reviewModeInfoAtom)
  const isReviewMode = useAtomValue(isReviewModeAtom)

  const prevIndex = useMemo(() => {
    const newIndex = state.chapterData.index - 1
    return newIndex < 0 ? 0 : newIndex
  }, [state.chapterData.index])
  const nextIndex = useMemo(() => {
    const newIndex = state.chapterData.index + 1
    return newIndex > state.chapterData.words.length - 1 ? state.chapterData.words.length - 1 : newIndex
  }, [state.chapterData.index, state.chapterData.words.length])

  usePrefetchPronunciationSound(nextWord?.name, nextWord?.audio, nextWord?.ttsEngine === 'browser' || nextWord?.mode === 'sgd' || nextWord?.mode === 'sst')

  const reloadCurrentWordComponent = useCallback(() => {
    setWordComponentKey((old) => old + 1)
  }, [])

  const updateReviewRecord = useCallback(
    (state: TypingState) => {
      setReviewModeInfo((old) => ({
        ...old,
        reviewRecord: old.reviewRecord ? { ...old.reviewRecord, index: state.chapterData.index } : undefined,
      }))
    },
    [setReviewModeInfo],
  )

  const onFinish = useCallback(() => {
    if (state.chapterData.index < state.chapterData.words.length - 1 || currentWordExerciseCount < loopWordTimes - 1) {
      // 用户完成当前单词
      if (currentWordExerciseCount < loopWordTimes - 1) {
        setCurrentWordExerciseCount((old) => old + 1)
        dispatch({ type: TypingStateActionType.LOOP_CURRENT_WORD })
        reloadCurrentWordComponent()
      } else {
        setCurrentWordExerciseCount(0)
        if (isReviewMode) {
          dispatch({
            type: TypingStateActionType.NEXT_WORD,
            payload: {
              updateReviewRecord,
            },
          })
        } else {
          dispatch({ type: TypingStateActionType.NEXT_WORD })
        }
      }
    } else {
      // 用户完成当前章节
      dispatch({ type: TypingStateActionType.FINISH_CHAPTER })
      if (isReviewMode) {
        setReviewModeInfo((old) => ({ ...old, reviewRecord: old.reviewRecord ? { ...old.reviewRecord, isFinished: true } : undefined }))
      }
    }
  }, [
    state.chapterData.index,
    state.chapterData.words.length,
    currentWordExerciseCount,
    loopWordTimes,
    dispatch,
    reloadCurrentWordComponent,
    isReviewMode,
    updateReviewRecord,
    setReviewModeInfo,
  ])

  const onSkipWord = useCallback(
    (type: 'prev' | 'next') => {
      if (type === 'prev') {
        dispatch({ type: TypingStateActionType.SKIP_2_WORD_INDEX, newIndex: prevIndex })
      }

      if (type === 'next') {
        dispatch({ type: TypingStateActionType.SKIP_2_WORD_INDEX, newIndex: nextIndex })
      }
    },
    [dispatch, prevIndex, nextIndex],
  )

  useHotkeys(
    'Ctrl + Shift + ArrowLeft',
    (e) => {
      e.preventDefault()
      onSkipWord('prev')
    },
    { preventDefault: true },
  )

  useHotkeys(
    'Ctrl + Shift + ArrowRight',
    (e) => {
      e.preventDefault()
      onSkipWord('next')
    },
    { preventDefault: true },
  )
  const [isShowTranslation, setIsHoveringTranslation] = useState(false)

  const handleShowTranslation = useCallback((checked: boolean) => {
    setIsHoveringTranslation(checked)
  }, [])

  useHotkeys(
    'tab',
    () => {
      handleShowTranslation(true)
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  useHotkeys(
    'tab',
    () => {
      handleShowTranslation(false)
    },
    { enableOnFormTags: true, keyup: true, preventDefault: true },
    [],
  )

  const shouldShowTranslation = useMemo(() => {
    return isShowTranslation || state.isTransVisible
  }, [isShowTranslation, state.isTransVisible])

  return (
    <div className="container flex h-full min-h-0 w-full flex-col items-center justify-center">
      <div className="container flex h-24 w-full shrink-0 grow-0 justify-between px-12 pt-10">
        {isShowPrevAndNextWord && state.isTyping && (
          <>
            <PrevAndNextWord type="prev" />
            <PrevAndNextWord type="next" />
          </>
        )}
      </div>
      <div className="container flex min-h-0 flex-grow flex-col items-center justify-start overflow-y-auto py-4">
        {currentWord && (
          <div className="relative flex w-full justify-center">
            {!state.isTyping && (
              <div className="absolute flex h-full w-full justify-center">
                <div className="z-10 flex w-full items-center backdrop-blur-sm">
                  <p className="w-full select-none text-center text-xl text-gray-600 dark:text-gray-50">
                    按任意键{state.timerData.time ? '继续' : '开始'}
                  </p>
                </div>
              </div>
            )}
            <div className="relative flex w-full max-w-5xl flex-col items-center pb-8">
              {currentWord.mode === 'sgd' && (
                <div className="mb-7 flex max-w-4xl flex-col items-center gap-2 text-center">
                  <div className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    SGD · {currentWord.category}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-100">{currentWord.topic}</div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Round {currentWord.round} · {currentWord.roundLabel}</span>
                    <span>•</span>
                    <span>{currentWord.speaker} · {currentWord.gender}</span>
                    {currentWord.noteType && (
                      <>
                        <span>•</span>
                        <span>
                          {currentWord.noteType === 'S'
                            ? '建议 Suggestion'
                            : currentWord.noteType === 'C'
                              ? '结论 Conclusion'
                              : '例子 Example'}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>{currentWord.phraseIndexInTopic}/{currentWord.topicPhraseCount}</span>
                    <span>•</span>
                    <span>固定顺序</span>
                  </div>
                  {previousWord?.mode === 'sgd' && previousWord.topic === currentWord.topic && (
                    <div className="mt-1 rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-slate-900/30 dark:text-gray-400">
                      上一句 · {previousWord.speaker}: {previousWord.name}
                    </div>
                  )}
                </div>
              )}
              <WordComponent word={currentWord} onFinish={onFinish} key={wordComponentKey} />
              {currentWord.mode !== 'sgd' && phoneticConfig.isOpen && <Phonetic word={currentWord} />}
              {currentWord.mode !== 'sgd' && !currentWord.meaningZh && (
                <Translation
                  trans={currentWord.trans.join('；')}
                  showTrans={shouldShowTranslation}
                  onMouseEnter={() => handleShowTranslation(true)}
                  onMouseLeave={() => handleShowTranslation(false)}
                />
              )}
              <StudyContext word={currentWord} />
            </div>
          </div>
        )}
      </div>
      <Progress className={`mb-10 mt-auto ${state.isTyping ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}
