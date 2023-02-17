import { FC } from 'react'
import { HiOutlineHome, HiOutlineMenu, HiSearch } from 'react-icons/hi'

import Avatar from '@/components/Avatar'
import Layout from '@/components/Layout'
import { MenuItems } from '@/components/Menu'

const avatar =
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'

const navigation: MenuItems = [
  {
    data: [
      {
        key: 1,
        name: 'Dashboard',
        icon: HiOutlineHome
      },
      { key: 2, name: '搜索', href: '#', icon: HiSearch },
      {
        key: 6,
        name: 'Sub Menu',
        icon: HiOutlineMenu,
        subItems: [
          { key: 601, name: 'Sub 1' },
          { key: 602, name: 'Sub 2' },
          { key: 603, name: 'Sub 3' }
        ]
      }
    ]
  },
  {
    title: '组件',
    data: [
      { key: 3, name: 'Button 按钮' },
      { key: 4, name: 'Dropdown 下拉菜单' }
    ]
  }
]

const Logo = (
  <>
    <Avatar
      shape="square"
      size="sm"
      alt="Dev.Components"
      className="bg-primary text-primary-content font-semibold"
    />
    <span className="font-semibold font-mono ml-3">Dev.Components</span>
  </>
)

const App: FC = () => {
  return (
    <Layout
      logo={Logo}
      menu={navigation}
      user={{
        avatar,
        name: 'LunTai',
        subTitle: 'admin'
      }}
    >
      <div className="flex gap-2">
        <Avatar src={avatar} />
        <Avatar src={avatar} shape="square" />
        <Avatar src={avatar} size="lg" />
        <Avatar alt="Ssss" />
        <Avatar src={avatar} size="sm" />
      </div>
      <div className="mt-4">
        <Avatar.Group
          max={3}
          items={[
            { src: avatar },
            { src: avatar },
            { src: avatar },
            { src: avatar }
          ]}
        />
      </div>
    </Layout>
  )
}

export default App
