import { useChapterStats } from '../hooks/useChapterStats'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { idDictionaryMap } from '@/resources/dictionary'
import { useEffect, useRef } from 'react'
import IconCheckCircle from '~icons/heroicons/check-circle-solid'

export default function Chapter({
  index,
  checked,
  dictID,
  onChange,
}: {
  index: number
  checked: boolean
  dictID: string
  onChange: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting
  const chapterStatus = useChapterStats(index, dictID, isVisible)
  const section = idDictionaryMap[dictID]?.sections?.[index]

  useEffect(() => {
    if (checked && ref.current !== null) {
      const button = ref.current
      const container = button.parentElement?.parentElement?.parentElement
      container?.scroll({ top: button.offsetTop - container.offsetTop - 260, behavior: 'smooth' })
    }
  }, [checked])

  return (
    <div
      ref={ref}
      className="relative flex min-h-[5.5rem] w-[18rem] cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl bg-slate-100 px-4 py-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
      onClick={() => onChange(index)}
    >
      {section?.category && <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-500">{section.category}</p>}
      <h1 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800 dark:text-slate-100">
        {section?.name || `第 ${index + 1} 章`}
      </h1>
      {section?.subtitle && <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">{section.subtitle}</p>}
      <div className="mt-1.5 flex gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        {section?.wordCount != null && <span>{section.wordCount} 项</span>}
        <span>{chapterStatus ? (chapterStatus.exerciseCount > 0 ? `练习 ${chapterStatus.exerciseCount} 次` : '未练习') : '加载中...'}</span>
      </div>
      {checked && <IconCheckCircle className="absolute -bottom-4 -right-4 h-18 w-18 text-6xl text-green-500 opacity-40 dark:text-green-300" />}
    </div>
  )
}
