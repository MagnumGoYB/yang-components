import classNames from 'classnames'
import { FC, Fragment, Key, ReactElement, cloneElement, useState } from 'react'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'

import { NativeProps } from '../../utils/typings'

export type MenuItem = {
  key: Key
  name: string
  icon?: ReactElement
  href?: string
  disabled?: boolean
  subItems?: Omit<MenuItem, 'icon'>[]
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

  const isActiveSubs = (item: MenuItem, active?: Key) => {
    if (!item.subItems || !active) return
    return item.subItems.some((sub) => active === sub.key)
  }

  const isHasSubs = (item: MenuItem) => {
    return !!item.subItems && item.subItems.length > 0
  }

  const onClick = (key: MenuItem['key']) => {
    setActive(() => {
      if (key === active) return undefined
      return key
    })
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
            <Fragment key={it.key}>
              <li
                className={classNames({
                  bordered: item.bordered && active === it.key,
                  disabled: it.disabled
                })}
              >
                <a
                  href={isHasSubs(it) ? undefined : it.href}
                  className={classNames({
                    active: active === it.key,
                    'pr-8': isHasSubs(it)
                  })}
                  onClick={() => {
                    if (it.disabled) return
                    onClick(it.key)
                  }}
                >
                  {it.icon && cloneElement(it.icon, { className: 'h-5 w-5' })}
                  {it.name}
                  {isHasSubs(it) && (
                    <>
                      {active === it.key || isActiveSubs(it, active) ? (
                        <HiChevronDown className="h-4 w-4 absolute right-4" />
                      ) : (
                        <HiChevronRight className="h-4 w-4 absolute right-4" />
                      )}
                    </>
                  )}
                </a>
              </li>
              {(active === it.key || isActiveSubs(it, active)) &&
                isHasSubs(it) && (
                  <div className="ml-8">
                    {it.subItems?.map((sub) => {
                      return (
                        <li key={sub.key}>
                          <a
                            href={sub.href}
                            className={classNames({
                              active: active === sub.key
                            })}
                            onClick={() => {
                              if (sub.disabled) return
                              onClick(sub.key)
                            }}
                          >
                            {sub.name}
                          </a>
                        </li>
                      )
                    })}
                  </div>
                )}
            </Fragment>
          ))}
        </ul>
      ))}
    </>
  )
}

export default Menu
