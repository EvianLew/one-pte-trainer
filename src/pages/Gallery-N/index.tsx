import DictionaryGroup from './CategoryDicts'
import Layout from '@/components/Layout'
import logo from '@/assets/one-logo.png'
import { dictionaries } from '@/resources/dictionary'
import type { Dictionary } from '@/typings'
import { groupByDictTags } from '@/utils/groupBy'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useMemo } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate } from 'react-router-dom'
import IconX from '~icons/tabler/x'

export default function GalleryPage() {
  const navigate = useNavigate()
  const groupedByTag = useMemo(() => groupByDictTags(dictionaries) as Record<string, Dictionary[]>, [])

  useHotkeys('enter,esc', () => navigate('/'), { preventDefault: true })

  return (
    <Layout>
      <div className="relative mb-auto mt-auto flex w-full flex-1 flex-col overflow-y-auto px-10 lg:px-20">
        <IconX className="absolute right-12 top-8 h-7 w-7 cursor-pointer text-gray-400 lg:right-20" onClick={() => navigate('/')} />
        <div className="mt-16 flex w-full flex-1 flex-col items-center">
          <img src={logo} className="mb-8 h-24 w-auto max-w-[440px] rounded-md object-contain" alt="壹ONE Film Institution" />
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">PTE 专项词库</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">当前已启用 Listening FIB 与 SST；后续可继续加入 SGD 等专项词库。</p>
          </div>
          <ScrollArea.Root className="w-full max-w-6xl flex-1 overflow-y-auto">
            <ScrollArea.Viewport className="h-full w-full">
              <DictionaryGroup groupedDictsByTag={groupedByTag} />
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </div>
      </div>
    </Layout>
  )
}
