import classNames from 'classnames'
import { FC, Key, useState } from 'react'
import { IconType } from 'react-icons'

import { NativeProps } from '@/utils'

export type MenuItem = {
  key: Key
  name: string
  icon?: IconType
  href?: string
  disabled?: boolean
}

export type MenuItems = {
  title?: string
  data: MenuItem[]
  bordered?: boolean
}[]

type MenuMode = 'horizontal' | 'vertical'

export type MenuProps = {
  defaultKey?: MenuItem['key']
  items: MenuItems
  mode?: MenuMode
  compact?: boolean
  onSelect?: (key: MenuItem['key']) => void
}

const Menu: FC<MenuProps & NativeProps> = (props) => {
  const {
    items,
    defaultKey,
    onSelect,
    mode = 'vertical',
    className,
    style,
    compact = true
  } = props

  const [active, setActive] = useState(defaultKey)

  const onClick = (key: MenuItem['key']) => {
    setActive(key)
    onSelect?.(key)
  }

  return (
    <>
      {items.map((item, index) => (
        <ul
          key={index}
          style={style}
          className={classNames('menu', className, {
            'menu-compact': compact,
            'menu-horizontal': mode === 'horizontal',
            'menu-vertical': mode === 'vertical'
          })}
        >
          {mode === 'vertical' && (
            <>
              {index > 0 && <li />}
              {item.title && (
                <li className="menu-title">
                  <span>{item.title}</span>
                </li>
              )}
            </>
          )}
          {item.data.map((it) => (
            <li
              key={it.key}
              className={classNames({
                bordered: item.bordered && active === it.key,
                disabled: it.disabled
              })}
            >
              <a
                href={it.href}
                className={classNames({ active: active === it.key })}
                onClick={() => {
                  if (it.disabled) return
                  onClick(it.key)
                }}
              >
                {it.icon && <it.icon className="h-5 w-5" />}
                {it.name}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </>
  )
}

export default Menu
