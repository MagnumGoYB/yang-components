import type { CSSProperties, AriaAttributes } from 'react'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & object

/**
 * Get the keys of T without any keys of U.
 */
export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never
}

export type XOR<T, U> = T | U extends object
  ? Prettify<Without<T, U> & U> | Prettify<Without<U, T> & T>
  : T | U

export type NativeProps<S extends string = never> = {
  className?: string
  style?: CSSProperties & Partial<Record<S, string>>
} & AriaAttributes
