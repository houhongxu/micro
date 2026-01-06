import { MICRO_BASE_ASSETS_PATH, PORT } from './constants'
import { getNacosConfig } from './mock-nacos'
import { getHtmlEntry } from './utils'
import express from 'express'
import path from 'path'
import { sharedConfig } from 'shared-config'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 路由要在静态文件中间件之前，确保根路径使用 EJS 模板
app.get('/', async (req, res) => {
  try {
    const url = req.header('X-URL') ?? 'hhxdev.icu'

    const nacosConfig = await getNacosConfig()

    if (!nacosConfig) {
      res.status(500).send('Nacos 配置获取失败')
      return
    }

    const env = nacosConfig[url]

    if (!env) {
      res.status(500).send(`未找到 URL 对应的环境配置: ${url}`)
      return
    }

    const currentConfig = sharedConfig[env]

    if (!currentConfig) {
      res.status(500).send(`环境配置不存在: ${env}`)
      return
    }
    console.log(
      'sharedConfig 命中配置:',
      env,
      JSON.stringify(currentConfig, null, 2),
    )

    currentConfig.htmlEntry = getHtmlEntry()

    res.render('index', currentConfig)
  } catch (error) {
    console.error('处理请求失败:', error)
    res.status(500).send('服务器内部错误')
  }
})

// 静态文件中间件放在路由之后，处理其他静态资源
app.use(express.static(MICRO_BASE_ASSETS_PATH))

app.listen(PORT, async () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)

  // 测试 Nacos 连接
  try {
    const testConfig = await getNacosConfig()
    console.log('Nacos 连接测试:', testConfig)
  } catch (error) {
    console.error('Nacos 连接测试失败:', error)
  }
})
