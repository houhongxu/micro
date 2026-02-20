import { BASE_WEB_STATIC_PATH, PORT } from './constants'
import { DEFAULT_NACOS_CONFIG_REG } from './constants'
import { getHtmlEntry } from './utils/html'
import {
  getNacosConfigKey,
  NACOS_CONFIG_MAP,
  watchNacosConfig,
} from './utils/nacos'
import express from 'express'
import path from 'path'

watchNacosConfig(DEFAULT_NACOS_CONFIG_REG)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/static', express.static(BASE_WEB_STATIC_PATH))

app.get('*', async (req, res) => {
  try {
    const xUrl = req.header('X-URL') ?? 'default'

    console.log('请求路径:', req.url)

    const nacosConfig = NACOS_CONFIG_MAP.get(
      getNacosConfigKey(DEFAULT_NACOS_CONFIG_REG),
    )

    if (!nacosConfig) {
      res.status(500).send('Nacos 配置获取失败')
      return
    }

    const xUrlConfig = nacosConfig[xUrl]

    if (!xUrlConfig) {
      res.status(500).send(`未找到 ${xUrl} 对应的配置: `)
      return
    }

    console.log(`${xUrl} 配置:`, xUrlConfig)

    res.render(
      'index',
      { ...xUrlConfig, htmlEntry: getHtmlEntry() },
      (err, html) => {
        if (err) {
          res.status(500).send('服务器内部错误')
          return
        }

        res.send(html)
      },
    )
  } catch (error) {
    console.error('处理请求失败:', error)
    res.status(500).send('服务器内部错误')
  }
})

app.listen(PORT, async () => {
  console.log(`app listening on port http://localhost:${PORT}`)
})
