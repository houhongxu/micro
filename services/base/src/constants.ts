import { NacosConfigReg } from './types/nacos'
import path from 'path'

export const PORT = 9000

// 从 services/base/src 或 services/base/dist 到 monorepo 根目录
export const ROOT_PATH = path.join(__dirname, '..', '..', '..')

// 前端构建产物：clients/react-base（base 服务用 pnpm -F react-base build 构建）
export const BASE_WEB_HTML_PATH = path.join(
  ROOT_PATH,
  'clients/react-base/dist/index.html',
)

export const BASE_WEB_STATIC_PATH = path.join(
  ROOT_PATH,
  'clients/react-base/dist/static',
)

export const DEFAULT_NACOS_CONFIG_REG: NacosConfigReg = {
  dataId: 'deafault_micro_nacos_config',
  group: 'DEFAULT_GROUP',
}
