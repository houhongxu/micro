import { BASE_WEB_HTML_PATH } from '../constants'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'

export function getHtmlEntry(): { cssLinks: string; jsScripts: string } {
  const html = readFileSync(BASE_WEB_HTML_PATH, 'utf-8')

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
