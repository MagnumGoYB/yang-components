import classNames from 'classnames'
import {
  FC,
  PointerEventHandler,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { HiMenuAlt2, HiOutlineChevronDoubleRight } from 'react-icons/hi'
import { useMedia } from 'react-use'

type LayoutProps = {
  sidebar?: ReactNode
  header?: ReactNode
}

const Layout: FC<LayoutProps & PropsWithChildren> = (props) => {
  const { sidebar, header, children } = props

  const [draging, setDraging] = useState<boolean>(false)
  const [hide, setHide] = useState<boolean>(false)
  const [hoverToggle, setHoverToggle] = useState<boolean>(false)
  const [hoverCloseing, setHoverCloseing] = useState<boolean>(false)
  const [sidebarWidth, setSidebarWidth] = useState<number>()

  const sidebarRef = useRef<HTMLDivElement>(null)
  const resizeDragLineRef = useRef<HTMLDivElement>(null)
  const toggleSiderbarRef = useRef<HTMLButtonElement>(null)

  const dragStartX = useRef<number>()
  const dragEndX = useRef<number>()
  const maxSiderWidth = useRef(400).current
  const minSiderWidth = useRef(230).current

  const md = useMedia('(min-width: 768px)')

  const onResizeSidebarStart: PointerEventHandler<HTMLDivElement> = (e) => {
    dragStartX.current = e.nativeEvent.x
    setDraging(true)
    e.preventDefault()
  }

  const onResizeSidebarMove = useCallback(
    (e: PointerEvent) => {
      if (!draging) return
      if (!sidebarRef.current) return
      if (!dragStartX.current) return
      dragEndX.current = e.x
      const x = Math.ceil(e.x)
      const movementX = Math.ceil(e.movementX)
      if (x <= maxSiderWidth && x >= minSiderWidth) {
        setSidebarWidth(x)
      }
      if (
        dragStartX.current < dragEndX.current &&
        x > maxSiderWidth &&
        x - maxSiderWidth >= movementX
      ) {
        setSidebarWidth(maxSiderWidth)
      }
      if (
        dragStartX.current > dragEndX.current &&
        x < minSiderWidth &&
        minSiderWidth - x >= movementX
      ) {
        setSidebarWidth(minSiderWidth)
        if (x < 150) {
          setDraging(false)
          setHide(true)
        }
      }

      e.preventDefault()
    },
    [draging, maxSiderWidth, minSiderWidth]
  )

  const onResizeSidebarEnd = useCallback(
    (e: PointerEvent) => {
      if (!draging) return
      setDraging(false)
      e.preventDefault()
    },
    [draging]
  )

  const onResetSidebarWith = () => setSidebarWidth(undefined)

  const hoverShowSidebar = () => {
    if (!hide) return
    setHoverCloseing(false)
    setHoverToggle(true)
  }

  const hoverHideSidebar = useCallback(() => {
    if (!hide) return
    if (hoverCloseing) return
    setHoverToggle(false)
    setHoverCloseing(true)
    setTimeout(() => {
      setHoverCloseing(false)
    }, 500)
  }, [hide, hoverCloseing])

  const showSiderbar = () => {
    if (!hide) return
    setHide(false)
    hoverHideSidebar()
  }

  useEffect(() => {
    if (!sidebarRef || !resizeDragLineRef || hide || hoverToggle) return

    document.addEventListener('pointermove', onResizeSidebarMove)
    document.addEventListener('pointerup', onResizeSidebarEnd)

    return () => {
      document.removeEventListener('pointermove', onResizeSidebarMove)
      document.removeEventListener('pointerup', onResizeSidebarEnd)
    }
  }, [onResizeSidebarMove, onResizeSidebarEnd, hide, hoverToggle])

  useEffect(() => {
    if (!sidebarRef.current || !toggleSiderbarRef.current) return
    if (!hide || !hoverToggle) return
    const listener = (e: PointerEvent) => {
      if (
        !toggleSiderbarRef.current?.contains(e.target as HTMLElement) &&
        !sidebarRef.current?.contains(e.target as HTMLElement)
      ) {
        hoverHideSidebar()
      }
    }
    document.addEventListener('pointermove', listener)

    return () => {
      document.removeEventListener('pointermove', listener)
    }
  }, [hide, hoverHideSidebar, hoverToggle, sidebarRef, toggleSiderbarRef])

  return (
    <>
      <div
        ref={sidebarRef}
        style={md ? { width: sidebarWidth } : {}}
        className={classNames(
          'hidden bg-slate-50 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0',
          {
            '-translate-x-[110%]': hide && !hoverToggle,
            'md:mt-14 md:z-10 md:border-r md:border-t md:border-gray-200 shadow-[0_5px_17px_rgba(12,12,12,0.14)] rounded-tr-md transition-transform duration-500':
              hoverToggle || hoverCloseing
          }
        )}
      >
        <div
          className={classNames('flex flex-col flex-grow overflow-y-auto', {
            'border-r border-gray-200': !hide
          })}
        >
          {sidebar}
        </div>
        <div
          ref={resizeDragLineRef}
          onPointerDown={onResizeSidebarStart}
          onDoubleClick={onResetSidebarWith}
          className={classNames(
            'absolute touch-none select-none h-full w-[10px] -right-[8px] cursor-col-resize after:absolute after:opacity-0 after:w-[3px] after:h-full after:right-[6px] after:bg-blue-500 after:z-10 after:transition hover:after:opacity-100',
            { 'after:opacity-100': draging, hidden: hoverToggle }
          )}
        />
      </div>

      <div
        style={
          md &&
          sidebarWidth &&
          sidebarWidth <= maxSiderWidth &&
          sidebarWidth >= minSiderWidth
            ? { paddingLeft: hide ? 0 : sidebarWidth }
            : {}
        }
        className="md:pl-64 flex flex-col flex-1"
      >
        <header className="flex flex-shrink-0 h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            type="button"
            className={classNames(
              'p-4 rounded text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
              { 'md:hidden': !hide }
            )}
            onClick={showSiderbar}
            ref={toggleSiderbarRef}
            onPointerEnter={hoverShowSidebar}
          >
            {hoverToggle ? (
              <HiOutlineChevronDoubleRight className="h-6 w-6" />
            ) : (
              <HiMenuAlt2 className="h-6 w-6" />
            )}
          </button>
          <div className="flex-1 px-4 flex justify-between">{header}</div>
        </header>

        <main>
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout
