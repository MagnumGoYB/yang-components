import { FC, useRef, useState } from 'react'
import { HiOutlineCog, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { useMedia } from 'react-use'

const ThemeToggle: FC = () => {
  const iconClass = 'w-5 h-5'

  const [currentTheme, setCurrentTheme] = useState(() => {
    const theme = localStorage.getItem('theme')
    if (!theme) return ''
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    return theme
  })

  const ref = useRef<HTMLUListElement>(null)
  const isDark = useMedia('(prefers-color-scheme: dark)')

  const setTheme = (value: string) => {
    if (value !== 'system') {
      localStorage.setItem('theme', value)
      document.documentElement.setAttribute('data-theme', value)
      setCurrentTheme(value)
    } else {
      localStorage.removeItem('theme')
      document.documentElement.removeAttribute('data-theme')
      setCurrentTheme('')
    }
  }

  const onSelect = (value: string) => () => {
    ref.current?.blur()
    setTheme(value)
  }

  const renderCurrentThemeIcon = () => {
    const cls = 'w-7 h-7'
    const auto = isDark ? (
      <HiOutlineMoon className={cls} />
    ) : (
      <HiOutlineSun className={cls} />
    )
    switch (currentTheme) {
      case 'light':
        return <HiOutlineSun className={cls} />
      case 'dark':
        return <HiOutlineMoon className={cls} />
      case 'system':
      default:
        return auto
    }
  }

  return (
    <div className="dropdown">
      <div className="flex items-center h-full">
        <label tabIndex={-1} className="cursor-pointer">
          {renderCurrentThemeIcon()}
        </label>
      </div>
      <ul
        tabIndex={-1}
        ref={ref}
        className="dropdown-content menu p-2 -mt-3 shadow bg-base-200 rounded-box w-40"
      >
        <li>
          <a onClick={onSelect('light')}>
            <HiOutlineSun className={iconClass} />
            Light
          </a>
        </li>
        <li>
          <a onClick={onSelect('dark')}>
            <HiOutlineMoon className={iconClass} />
            Dark
          </a>
        </li>
        <li>
          <a onClick={onSelect('system')}>
            <HiOutlineCog className={iconClass} />
            System
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ThemeToggle
