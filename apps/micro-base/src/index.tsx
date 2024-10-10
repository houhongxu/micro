import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'

registerMicroApps([
  {
    name: 'micro-react',
    entry: '//localhost:9001',
    container: '#base-container',
    activeRule: '/micro-react',
  },
  {
    name: 'micro-vue',
    entry: '//localhost:9000',
    container: '#base-container',
    activeRule: '/micro-vue',
  },
])

setDefaultMountApp('/micro-react')

start()
