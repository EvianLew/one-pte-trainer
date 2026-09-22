import logo from '@/assets/one-logo.png'
import type { PropsWithChildren } from 'react'
import type React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="container z-20 mx-auto w-full px-10 py-5">
      <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
        <NavLink className="flex items-center no-underline hover:no-underline" to="/">
          <img src={logo} className="h-16 w-auto max-w-[320px] rounded-md object-contain" alt="壹ONE Film Institution" />
        </NavLink>
        <nav className="my-card flex w-auto content-center items-center justify-end space-x-3 rounded-xl bg-white p-4 transition-colors duration-300 dark:bg-gray-800">
          {children}
        </nav>
      </div>
    </header>
  )
}

export default Header
