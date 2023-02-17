import { FC } from 'react'

import { XOR } from '@/utils/typings'

import Avatar, { AvatarProps } from './Avatar'

type GroupProps = {
  size?: AvatarProps['size']
  items: XOR<{ src: string }, { alt: string }>[]
  max?: number
}

const Group: FC<GroupProps> = (props) => {
  const { items, size, max = 12 } = props
  return (
    <div className="avatar-group -space-x-6">
      {items.slice(0, max - 1).map((item, index) => (
        <Avatar key={index} {...item} size={size} />
      ))}
      {items.length >= max && (
        <Avatar size={size} alt="more" _isGroupPlaceholder />
      )}
    </div>
  )
}

export default Group
