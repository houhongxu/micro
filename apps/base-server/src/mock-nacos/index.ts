import { NacosConfigClient } from 'nacos'

export interface NacosConfig {
  [key: string]: string
}

export const configClient = new NacosConfigClient({
  serverAddr: '127.0.0.1:8848',
})

export async function getNacosConfig(): Promise<NacosConfig | undefined> {
  try {
    const configContent = await configClient.getConfig(
      'micro-nacos-config',
      'DEFAULT_GROUP',
    )

    if (!configContent || configContent.trim() === '') {
      return undefined
    }

    return JSON.parse(configContent)
  } catch (error) {
    console.error('获取 Nacos 配置失败:', error)
    return undefined
  }
}

/**
 * 监听配置变化
 */
export function watchNacosConfig(callback: (config: NacosConfig) => void) {
  configClient.subscribe(
    {
      dataId: 'micro-nacos-config',
      group: 'DEFAULT_GROUP',
    },
    (content: string) => {
      try {
        callback(JSON.parse(content))
      } catch (error) {
        console.error('解析配置变化失败:', error)
      }
    },
  )
}
