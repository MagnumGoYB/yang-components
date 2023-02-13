import type { CSSProperties, AriaAttributes } from 'react'

export type NativeProps<S extends string = never> = {
  className?: string
  style?: CSSProperties & Partial<Record<S, string>>
} & AriaAttributes
