import { MICRO_BASE_HTML_PATH } from './constants'
import { Config } from './mock-config'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import path from 'path'

export function getHtmlEntry(): Config['htmlEntry'] {
  const html = readFileSync(MICRO_BASE_HTML_PATH, 'utf-8')
  const $ = cheerio.load(html)

  const cssLinksArr: string[] = []
  const jsScriptsArr: string[] = []

  $('link[rel="stylesheet"]').each((i, el) => {
    cssLinksArr.push($(el).toString())
  })

  $('script[src]').each((i, el) => {
    jsScriptsArr.push($(el).toString())
  })

  return { cssLinks: cssLinksArr.join(''), jsScripts: jsScriptsArr.join('') }
}
