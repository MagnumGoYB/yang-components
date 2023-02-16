import { FC } from 'react'
import { HiOutlineHome, HiSearch } from 'react-icons/hi'

import { Layout } from '@/components/Layout'

import { Avatar } from './components/Avatar'

const navigation = [
  {
    data: [
      { key: 1, name: 'Dashboard', icon: HiOutlineHome },
      { key: 2, name: '搜索', href: '#', icon: HiSearch }
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

const App: FC = () => {
  return (
    <Layout
      logo={
        <>
          <Avatar
            shape="square"
            size="sm"
            alt="Tailwindcss"
            className="bg-primary text-primary-content font-semibold"
          />
          <span className="font-semibold font-mono ml-3">Tailwindcss</span>
        </>
      }
      menu={navigation}
      user={{
        name: 'LunTai',
        avatar:
          'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        subTitle: 'admin'
      }}
    >
      <h1 className="text-2xl font-semibold text-gray-900">Hello World</h1>
    </Layout>
  )
}

export default App
