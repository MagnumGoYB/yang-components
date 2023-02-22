# yang-components

`yang-components` 是基于 **[daisyUI](https://daisyui.com/)** 样式风格，并使用 **[Tailwind CSS](https://tailwindcss.com/)** 扩展编写的一款 React 组件库。

## 安装

```bash
pnpm i react react-dom yang-components
# or
npm i react react-dom yang-components
# or
yarn add react react-dom yang-components
```

如果你的项目中已经安装了 `react` `react-dom` 你只需要安装 `yang-components`
作为插件。

## 示例

```tsx filename="index.tsx"
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'yang-components/dist/index.css'
import { HiOutlineHome, HiOutlineMenu } from 'react-icons/hi'
import { Layout } from 'yang-components'

const menu = [
  {
    title: 'Group 1',
    data: [
      {
        key: 1,
        name: 'Dashboard',
        icon: <HiOutlineHome />
      }
    ]
  },
  {
    title: 'Group 2',
    data: [
      {
        key: 3,
        name: 'Menu',
        icon: <HiOutlineMenu />,
        subItems: [
          { key: 301, name: 'Sub Menu 1' },
          { key: 302, name: 'Sub Menu 2' }
        ]
      }
    ]
  }
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Layout menu={menu}>
    <h1>Welcome!</h1>
  </Layout>
)
```

### 按需加载

`yang-components` 默认支持基于 ES modules 的 tree shaking。

### TypeScript

`yang-components` 使用 TypeScript 进行书写并提供了完整的定义文件。

### 贡献

如果你希望参与贡献，欢迎 [Pull
Request](https://github.com/MagnumGoYB/yang-components/pulls)，或给我 [报告
Bug](https://github.com/MagnumGoYB/yang-components/issues/new)。
