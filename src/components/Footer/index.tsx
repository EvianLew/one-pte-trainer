import type React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="mb-1 mt-4 flex w-full items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
      <span>壹ONE · PTE Vocabulary Trainer</span>
      <span>·</span>
      <span>学习数据仅保存在本机</span>
    </footer>
  )
}

export default Footer
