// 使用npm包

export interface Config {
  configPrefix: string
  version: Record<string, string>
  htmlEntry?: { cssLinks: string; jsScripts: string }
}

export const config: Record<string, Config> = {
  dev: { configPrefix: '', version: { react: '18.0.0' } },
}
