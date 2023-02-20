import classNames from 'classnames'
import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { HiMenuAlt2, HiOutlineChevronDoubleRight } from 'react-icons/hi'

import Avatar from '../Avatar'
import Menu, { MenuItem, MenuItems } from '../Menu'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'
import User from './User'
import { sleep } from '../../utils'
import { useMedia } from '../../hooks'

export type User = {
  name: string
  avatar?: string
  subTitle?: string
}

export type LayoutProps = {
  title?: string | ReactNode
  header?: ReactNode
  menu: MenuItems
  menuDefaultKey?: MenuItem['key']
  user?: User
}

type LayoutContextType = {
  isMd?: boolean
  isCollapsed?: boolean
  isHoverPower?: boolean
  width?: number
  maxWidth: number
  minWidth: number
  toggleButtonRef: HTMLButtonElement | null
  setWidth?: (width?: number) => void
  setIsCollapsed?: (isCollapsed: boolean) => void
  setIsHoverPower?: (isHoverPower: boolean) => void
}

const maxWidth = 400
const minWidth = 230
const headerIconClassNames =
  'h-16 w-16 btn btn-ghost hover:bg-transparent focus:bg-transparent'

export const LayoutContext = createContext<LayoutContextType>({
  toggleButtonRef: null,
  maxWidth,
  minWidth
})

const Layout: FC<LayoutProps & PropsWithChildren> = (props) => {
  const { title, menu, menuDefaultKey, user, header, children } = props

  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isHoverPower, setIsHoverPower] = useState<boolean>(false)
  const [width, setWidth] = useState<number>()

  const isMd = useMedia('(min-width: 768px)')

  const isResized = !!width && width <= maxWidth && width >= minWidth

  const renderSidebar = () => (
    <>
      <div className="flex-1 h-0">
        {title && (
          <div className="border-b border-base-300">
            <div className="btn btn-ghost btn-block normal-case flex-shrink-0 flex items-center justify-start px-4 h-16 rounded-none hover:bg-base-100">
              {typeof title === 'string' ? (
                <>
                  <Avatar
                    shape="square"
                    size="sm"
                    alt={title}
                    className="bg-primary text-primary-content font-semibold"
                  />
                  <span className="font-semibold font-mono ml-3">{title}</span>
                </>
              ) : (
                title
              )}
            </div>
          </div>
        )}
        <Menu
          className="mt-5 space-y-1 px-3"
          defaultKey={menuDefaultKey}
          items={menu}
        />
      </div>
      {user && <User {...user} />}
    </>
  )

  const onClickToggleButton = async () => {
    setWidth(undefined)
    if (isHoverPower) {
      setIsCollapsed(false)
      setIsHoverPower(false)
    } else {
      setIsCollapsed(!isCollapsed)
      await sleep(500)
      setIsHoverPower(!isCollapsed)
    }
  }

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isHoverPower) return
      if (
        toggleButtonRef.current?.contains(e.target as HTMLElement) ||
        sidebarRef.current?.contains(e.target as HTMLElement)
      ) {
        setIsCollapsed(false)
      } else {
        setIsCollapsed(true)
      }
      e.preventDefault()
    },
    [isHoverPower]
  )

  useEffect(() => {
    document.addEventListener('pointermove', onPointerMove)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
    }
  }, [onPointerMove])

  return (
    <LayoutContext.Provider
      value={{
        isMd,
        isCollapsed,
        isHoverPower,
        width,
        maxWidth,
        minWidth,
        toggleButtonRef: toggleButtonRef.current,
        setWidth,
        setIsCollapsed,
        setIsHoverPower
      }}
    >
      <div className="drawer">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {isMd && <Sidebar ref={sidebarRef}>{renderSidebar()}</Sidebar>}

          <div
            style={
              isMd && isResized && !isCollapsed && !isHoverPower
                ? { paddingLeft: width }
                : {}
            }
            className={classNames('flex flex-col flex-1', {
              'md:pl-64': !isCollapsed && !isHoverPower
            })}
          >
            <div className="border-b border-base-300">
              <header className="flex flex-shrink-0 h-16 bg-base-100 shadow-sm">
                {isMd ? (
                  <button
                    type="button"
                    className={headerIconClassNames}
                    ref={toggleButtonRef}
                    onClick={onClickToggleButton}
                  >
                    {isCollapsed ? (
                      <HiOutlineChevronDoubleRight className="h-6 w-6" />
                    ) : (
                      <HiMenuAlt2 className="h-6 w-6" />
                    )}
                  </button>
                ) : (
                  <label
                    htmlFor="sidebar"
                    className={classNames(
                      'drawer-button',
                      headerIconClassNames
                    )}
                  >
                    <HiMenuAlt2 className="h-6 w-6" />
                  </label>
                )}
                <ThemeToggle />
                <div className="flex-1 px-4 flex justify-between">{header}</div>
              </header>
            </div>

            <main>
              <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
              </div>
            </main>
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="sidebar" className="drawer-overlay" />
          <Sidebar>{renderSidebar()}</Sidebar>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

export default Layout
