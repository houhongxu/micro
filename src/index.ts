import App from './App.vue'
import { routes } from './routes'
import './style.css'
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from 'vite-plugin-qiankun/dist/helper'
import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

let instance: ReturnType<typeof createApp> | null = null

function render(props?: QiankunProps) {
  const router = createRouter({
    history: createWebHistory(
      qiankunWindow.__POWERED_BY_QIANKUN__ ? '/micro-vue' : '/',
    ),
    routes,
  })

  instance = createApp(App)

  instance
    ?.use(router)
    .mount(props?.container ? props.container.querySelector('#root')! : '#root')
}

renderWithQiankun({
  mount(props) {
    console.log('mount')
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount() {
    console.log('unmount')
    instance?.unmount()
  },
  update() {
    console.log('update')
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
