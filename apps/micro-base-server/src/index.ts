import { MICRO_BASE_ASSETS_PATH, PORT } from './constants'
import { config } from './mock-config'
import { nacosConfig } from './mock-nacos'
import { getHtmlEntry } from './utils'
import express from 'express'
import path from 'path'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'mock-static')))
app.use('/assets', express.static(MICRO_BASE_ASSETS_PATH))

app.get('/', (req, res) => {
  const url = req.header('X-URL') ?? 'hhxdev.icu'

  const env = nacosConfig[url]

  const currentConfig = config[env]

  currentConfig.htmlEntry = getHtmlEntry()

  res.render('index', currentConfig)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
