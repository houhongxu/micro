import packageJson from '../package.json'
import './public-path'
import { routesConfig } from './routes/config'
import '@/styles/global.css'
import 'high-order-ui/lib/index.css'
import { Suspense } from 'react'
import { Root, createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'viewerjs/dist/viewer.css'

let instance: Root | null = null

function render(props?: { container?: HTMLDivElement }) {
  const router = createBrowserRouter(
    routesConfig,
    props
      ? {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          basename: window.__POWERED_BY_QIANKUN__
            ? `/${packageJson.name}`
            : '/',
        }
      : {},
  )

  instance = createRoot(
    props?.container
      ? props.container.querySelector('#root')!
      : document.getElementById('root')!,
  )

  instance.render(
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>,
  )
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: { container: HTMLDivElement }) {
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance?.unmount()
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: { container: HTMLDivElement }) {
  console.log('update props', props)
}
