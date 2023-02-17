import classNames from 'classnames'
import { FC } from 'react'
import { HiSelector } from 'react-icons/hi'

import Avatar from '../Avatar'
import { User as UserProps } from './Layout'

const User: FC<UserProps> = (user) => {
  return (
    <div className="flex-shrink-0 flex border-t border-base-300">
      <a className="group rounded-none flex items-center justify-between btn btn-ghost btn-block h-auto p-4 normal-case hover:bg-base-100">
        <div className="flex items-center justify-start text-left">
          <Avatar
            className={classNames('inline-block h-10 w-10', {
              'bg-base-300': !user.avatar
            })}
            alt={user.name}
            src={user.avatar}
          />
          <div className="ml-3">
            <p className="text-base font-medium">{user.name}</p>
            <p className="text-sm font-normal">{user.subTitle}</p>
          </div>
        </div>
        <HiSelector className="h-4 w-4" />
      </a>
    </div>
  )
}

export default User
