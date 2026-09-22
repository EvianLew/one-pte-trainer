import logo from '@/assets/one-logo.png'
import type React from 'react'

const MobilePage: React.FC = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-black px-8">
      <div className="flex max-w-xl flex-col items-center text-center">
        <img src={logo} className="mb-10 w-full max-w-md object-contain" alt="壹ONE Film Institution" />
        <h1 className="text-2xl font-semibold text-white">PTE Vocabulary Trainer</h1>
        <p className="mt-4 leading-7 text-gray-300">当前版本为键盘专项训练设计，请使用电脑浏览器；平板可连接外接键盘使用。</p>
      </div>
    </main>
  )
}

export default MobilePage
