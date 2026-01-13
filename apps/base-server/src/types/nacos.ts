export interface Config {
  configPrefix: string
  version: Record<string, string>
}

export interface NacosConfig {
  [key: string]: Config
}

export interface NacosConfigReg {
  dataId: string
  group: string
}
