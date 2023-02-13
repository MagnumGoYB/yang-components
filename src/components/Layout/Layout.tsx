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
import { useMedia } from 'react-use'

import { sleep } from '@/utils'

import Sidebar2 from './Sidebar'
import { Menu, MenuItem, MenuItems } from '../Menu'

export type User = {
  name: string
  avatar?: string
}

export type LayoutProps = {
  logo?: ReactNode
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

export const LayoutContext = createContext<LayoutContextType>({
  toggleButtonRef: null,
  maxWidth,
  minWidth
})

const Layout: FC<LayoutProps & PropsWithChildren> = (props) => {
  const { logo, menu, menuDefaultKey, user, header, children } = props

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
        <div className="btn btn-ghost btn-block normal-case flex-shrink-0 flex items-center justify-start px-4 h-16 rounded-none border-t-0 border-r-0 border-l-0 border-b border-base-300 hover:bg-base-100 hover:border-base-300">
          {logo}
        </div>
        <Menu
          className="mt-5 space-y-1 px-3"
          defaultKey={menuDefaultKey}
          items={menu}
        />
      </div>
      {user && (
        <div className="flex-shrink-0 flex border-t border-base-300">
          <a className="group rounded-none flex items-center justify-start text-left btn btn-ghost btn-block h-auto p-4 normal-case hover:bg-base-100">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
            <div className="ml-3">
              <p className="text-base font-medium">{user.name}</p>
              <p className="text-sm font-normal">View profile</p>
            </div>
          </a>
        </div>
      )}
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
          {isMd && <Sidebar2 ref={sidebarRef}>{renderSidebar()}</Sidebar2>}

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
            <header className="flex flex-shrink-0 h-16 bg-base-100 shadow-sm border-b border-base-300">
              {isMd ? (
                <button
                  type="button"
                  className="h-16 w-16 btn btn-ghost hover:bg-transparent focus:bg-transparent"
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
                  className="h-16 w-16 btn btn-ghost drawer-button hover:bg-transparent focus:bg-transparent "
                >
                  <HiMenuAlt2 className="h-6 w-6" />
                </label>
              )}
              <div className="flex-1 px-4 flex justify-between">{header}</div>
            </header>

            <main>
              <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
              </div>
            </main>
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="sidebar" className="drawer-overlay" />
          <Sidebar2>{renderSidebar()}</Sidebar2>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

export default Layout
