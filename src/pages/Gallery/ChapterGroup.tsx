import ChapterButton from './ChapterButton'
import { CHAPTER_LENGTH } from '@/constants'
import { currentChapterAtom, currentDictInfoAtom } from '@/store'
import range from '@/utils/range'
import { useAtom, useAtomValue } from 'jotai'
import type React from 'react'

const ChapterGroup: React.FC<ChapterGroupProps> = ({ totalWords }) => {
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom)
  const currentDict = useAtomValue(currentDictInfoAtom)
  const { id: dictID, chapterCount, sections } = currentDict

  return (
    <main className="mr-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {range(0, chapterCount, 1).map((index) => {
        const section = sections?.[index]
        const wordCount = section
          ? section.wordCount
          : index + 1 === chapterCount
            ? totalWords % CHAPTER_LENGTH || CHAPTER_LENGTH
            : CHAPTER_LENGTH

        return (
          <ChapterButton
            wordCount={wordCount}
            key={`${dictID}-${index}`}
            selected={currentChapter === index}
            index={index}
            title={section?.name}
            subtitle={section ? `SGD · ${section.category ?? 'Discussion'}` : undefined}
            onClick={() => setCurrentChapter(index)}
          />
        )
      })}
    </main>
  )
}

export default ChapterGroup

export type ChapterGroupProps = {
  totalWords: number
}
