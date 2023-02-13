import { FC } from 'react'
import { HiOutlineHome, HiSearch } from 'react-icons/hi'

import { Layout } from '@/components/Layout'

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
          <div className="flex items-center justify-center h-8 w-8 rounded font-semibold bg-primary text-primary-content">
            T
          </div>
          <span className="font-semibold font-mono ml-3">Tailwindcss</span>
        </>
      }
      menu={navigation}
      user={{ name: '123' }}
    >
      <h1 className="text-2xl font-semibold text-gray-900">Hello World</h1>
    </Layout>
  )
}

export default App
