import classNames from 'classnames'
import { FC } from 'react'

import { NativeProps, XOR } from '@/utils/typings'

export type AvatarProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  onClick?: () => void
  _isGroupPlaceholder?: boolean
} & XOR<{ src: string; alt?: string }, { alt: string; src?: string }> &
  NativeProps

const Avatar: FC<AvatarProps> = (props) => {
  const {
    src,
    alt,
    size = 'md',
    shape = 'circle',
    onClick,
    className,
    style,
    _isGroupPlaceholder = false
  } = props

  const isCustomColor = className?.match(/bg-|text-/)?.length

  return (
    <div
      className={classNames('avatar', { placeholder: !src })}
      onClick={onClick}
    >
      <div
        className={classNames(className, {
          'bg-neutral-focus text-neutral-content': !src && !isCustomColor,
          'w-8 h-8': size === 'sm',
          'w-12 h-12': size === 'md',
          'w-16 h-16': size === 'lg',
          'w-24 h-24': size === 'xl',
          rounded: shape === 'square',
          'rounded-full': shape === 'circle'
        })}
        style={style}
      >
        {src ? (
          <img alt={alt} src={src} />
        ) : (
          <span
            className={classNames({
              'text-xs': size === 'sm',
              'text-xl': size === 'lg',
              'text-3xl': size === 'xl'
            })}
          >
            {_isGroupPlaceholder ? '+99' : alt?.slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  )
}

export default Avatar
