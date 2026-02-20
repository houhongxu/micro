import HomePage from './pages/home'
import { MICRO_APP_ENUM, MICRO_CONFIG } from '@/config/micro'
import '@/styles/global.css'
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

registerMicroApps(MICRO_CONFIG)

setDefaultMountApp(MICRO_APP_ENUM.REACT_HOST)

createRoot(document.getElementById('base-root')!).render(
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>,
)

start()
