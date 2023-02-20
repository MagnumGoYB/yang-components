import classNames from 'classnames'
import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { LayoutContext } from './Layout'
import { sleep } from '../../utils'

const Sidebar = forwardRef<HTMLDivElement, PropsWithChildren>((props, ref) => {
  const { children } = props

  const resizeRef = useRef<HTMLDivElement>(null)

  const {
    isMd,
    isCollapsed,
    isHoverPower,
    width,
    maxWidth,
    minWidth,
    setWidth,
    setIsCollapsed,
    setIsHoverPower
  } = useContext(LayoutContext)

  const [draging, setDraging] = useState<boolean>(false)

  const dragStartX = useRef<number>()
  const dragEndX = useRef<number>()

  const onResetWith = () => setWidth?.(undefined)

  const onResizeStart = useCallback((e: PointerEvent) => {
    if (!resizeRef.current?.contains(e.target as HTMLElement)) return
    dragStartX.current = e.screenX
    setDraging(true)
    e.preventDefault()
  }, [])

  const onResizeMove = useCallback(
    async (e: PointerEvent) => {
      if (!ref) return
      if (!draging) return
      if (!dragStartX.current) return
      dragEndX.current = e.x
      const x = Math.ceil(e.x)
      const movementX = Math.ceil(e.movementX)
      if (x <= maxWidth && x >= minWidth) {
        setWidth?.(x)
      }
      if (
        dragStartX.current < dragEndX.current &&
        x > maxWidth &&
        x - maxWidth >= movementX
      ) {
        setWidth?.(maxWidth)
      }
      if (
        dragStartX.current > dragEndX.current &&
        x < minWidth &&
        minWidth - x >= movementX
      ) {
        setWidth?.(minWidth)
        if (x < 150) {
          setIsCollapsed?.(true)
          await sleep(500)
          setIsHoverPower?.(true)
        }
      }

      e.preventDefault()
    },
    [
      draging,
      maxWidth,
      minWidth,
      ref,
      setIsCollapsed,
      setIsHoverPower,
      setWidth
    ]
  )

  const onResizeEnd = useCallback(
    (e: PointerEvent) => {
      if (!draging) return
      setDraging(false)
      e.preventDefault()
    },
    [draging]
  )

  useEffect(() => {
    if (!ref || !resizeRef) return
    document.addEventListener('pointerdown', onResizeStart)
    document.addEventListener('pointermove', onResizeMove)
    document.addEventListener('pointerup', onResizeEnd)
    return () => {
      document.removeEventListener('pointerdown', onResizeStart)
      document.removeEventListener('pointermove', onResizeMove)
      document.removeEventListener('pointerup', onResizeEnd)
    }
  }, [onResizeEnd, onResizeMove, onResizeStart, ref])

  return (
    <div
      ref={ref}
      style={isMd ? { width } : {}}
      className={classNames(
        'bg-base-200 flex w-64 flex-col fixed inset-y-0 z-20',
        {
          '-translate-x-[110%]': isCollapsed,
          'transition-transform duration-300 overflow-hidden shadow-[0_5px_17px_rgba(12,12,12,0.14)] md:mt-14 md:z-20 md:border-r md:border-t md:border-base-300 md:rounded-tr-md':
            isHoverPower
        }
      )}
    >
      <div
        className={classNames('flex flex-col flex-grow overflow-y-auto', {
          'border-r border-base-300': !isCollapsed && !isHoverPower
        })}
      >
        {children}
      </div>
      <div
        ref={resizeRef}
        onDoubleClick={onResetWith}
        className={classNames(
          'absolute touch-none select-none h-full w-[10px] -right-[8px] cursor-col-resize after:absolute after:opacity-0 after:w-[3px] after:h-full after:right-[6px] after:bg-base-content after:z-30 after:transition hover:after:opacity-100',
          { 'after:opacity-100': draging, hidden: isCollapsed }
        )}
      />
    </div>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
