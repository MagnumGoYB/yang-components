import { FC } from 'react'

import Avatar, { AvatarProps } from './Avatar'
import Group from './Group'
import { attachPropertiesToComponent } from '../../utils'

const CompoundedAvatar = Avatar as FC<Omit<AvatarProps, '_isGroupPlaceholder'>>

export default attachPropertiesToComponent(CompoundedAvatar, {
  Group
})
