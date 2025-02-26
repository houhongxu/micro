import App from './App'
import { APP_ENUM, MICRO_CONFIG } from './consts'
import './style.css'
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

registerMicroApps(MICRO_CONFIG)

setDefaultMountApp(APP_ENUM.vue)

createRoot(document.getElementById('base-root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

start()
