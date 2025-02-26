import path from 'path'

export const PORT = 3003

export const MICRO_BASE_ROOT_PATH = path.join(__dirname, '..', '..')

export const MICRO_BASE_HTML_PATH = path.join(
  MICRO_BASE_ROOT_PATH,
  './micro-base/dist/index.html',
)

export const MICRO_BASE_ASSETS_PATH = path.join(
  MICRO_BASE_ROOT_PATH,
  './micro-base/dist/assets',
)
