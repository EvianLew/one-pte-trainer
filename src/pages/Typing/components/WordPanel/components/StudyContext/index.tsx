import useNaturalSpeech from '@/hooks/useNaturalSpeech'
import type { Word } from '@/typings'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import IconChevronDown from '~icons/tabler/chevron-down'
import IconChevronUp from '~icons/tabler/chevron-up'
import IconVolume from '~icons/tabler/volume'

function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'indigo' | 'amber' | 'emerald' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-200',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
  }
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}>{children}</span>
}

export default function StudyContext({ word }: { word: Word }) {
  const [expanded, setExpanded] = useState(false)
  const exampleSpeech = useNaturalSpeech(word.example || '', word.gender)
  const otherOccurrences = word.otherOccurrences || []

  const zhFallback = useMemo(() => {
    if (word.exampleZh) return word.exampleZh
    if (word.meaningZh) return `中文参考（词义）：${word.meaningZh}`
    return ''
  }, [word.exampleZh, word.meaningZh])

  if (word.mode === 'sgd') {
    return (
      <div className="mt-5 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="indigo">SGD Discussion</Badge>
          <Badge>{word.category}</Badge>
          <Badge>{`Round ${word.round} · ${word.roundLabel || ''}`}</Badge>
          <Badge>{`${word.speaker || ''} · ${word.gender || ''}`}</Badge>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
          当前短句顺序来自你提供的九宫格资料；SGD 原题 PDF 暂时无法用现有密码解锁，因此本版不会伪造“原文例句”和中文逐句译文。原文一旦可读，会直接补到这里，不改变现有分类与顺序。
        </p>
      </div>
    )
  }

  if (!word.meaningZh && !word.example && word.mode !== 'sst') return null

  return (
    <div className="mt-5 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/75 px-5 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
      <div className="flex flex-wrap items-center gap-2">
        {word.mode === 'sst' ? <Badge tone="indigo">SST · 按题目</Badge> : <Badge tone="emerald">FIB · 听力词汇</Badge>}
        {word.questionPriority && <Badge tone={word.questionPriority === '8月最高频' ? 'amber' : 'slate'}>{word.questionPriority}</Badge>}
        {word.sourceType && <Badge>{word.sourceType}</Badge>}
        {word.exampleZhType && <Badge>{word.exampleZhType}</Badge>}
      </div>

      {word.mode === 'sst' && word.questionId && word.questionId !== 'unmatched' && (
        <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">题目出处</div>
          <div className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
            {word.questionId} · {word.questionTitle}
          </div>
          {word.questionNote && <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{word.questionNote}</div>}
        </div>
      )}

      {word.meaningZh && (
        <div className="mt-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">中文释义</div>
          <div className="mt-1 text-[15px] leading-7 text-slate-800 dark:text-slate-100">{word.meaningZh}</div>
        </div>
      )}

      {word.example && (
        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {word.exampleLocation === '原文/参考文本' ? '题目原文例句' : word.exampleLocation === '题库答案' ? '题库答案例句' : '英文参考例句'}
            </div>
            <button
              onClick={exampleSpeech.play}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/50"
            >
              <IconVolume className="h-4 w-4" />
              {exampleSpeech.isPlaying ? '播放中' : '听完整例句'}
            </button>
          </div>
          <div className="mt-2 select-text text-[15px] leading-7 text-slate-800 dark:text-slate-100">{word.example}</div>
          {zhFallback && (
            <div className="mt-2 rounded-xl bg-amber-50/70 px-3 py-2 text-sm leading-6 text-amber-900 dark:bg-amber-950/25 dark:text-amber-100">
              {zhFallback}
            </div>
          )}
        </div>
      )}

      {word.mode === 'sst' && (word.occurrenceCount || 0) > 1 && (
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-300"
          >
            这个词共出现在 {word.occurrenceCount} 道 SST 题目中
            {expanded ? <IconChevronUp /> : <IconChevronDown />}
          </button>
          {expanded && (
            <div className="mt-3 space-y-2">
              {otherOccurrences.map((occ) => (
                <div key={`${occ.questionId}-${occ.questionTitle}`} className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {occ.questionId} · {occ.questionTitle}
                  </div>
                  {occ.example && <div className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{occ.example}</div>}
                  {occ.exampleZh && <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">{occ.exampleZh}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
