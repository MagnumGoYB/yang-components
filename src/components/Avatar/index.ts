import { FC } from 'react'

import { attachPropertiesToComponent } from '@/utils'

import Avatar, { AvatarProps } from './Avatar'
import Group from './Group'

const CompoundedAvatar = Avatar as FC<Omit<AvatarProps, '_isGroupPlaceholder'>>

export default attachPropertiesToComponent(CompoundedAvatar, {
  Group
})
