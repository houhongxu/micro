import { NacosConfigReg } from './types/nacos'
import path from 'path'

export const PORT = 3000

export const ROOT_PATH = path.join(__dirname, '..', '..')

export const BASE_WEB_HTML_PATH = path.join(
  ROOT_PATH,
  './base-web/dist/index.html',
)

export const BASE_WEB_STATIC_PATH = path.join(
  ROOT_PATH,
  './base-web/dist/static',
)

export const DEFAULT_NACOS_CONFIG_REG: NacosConfigReg = {
  dataId: 'deafault_micro_nacos_config',
  group: 'DEFAULT_GROUP',
}
