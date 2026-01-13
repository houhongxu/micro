import { NacosConfig, NacosConfigReg } from '../types/nacos'
import { NacosConfigClient } from 'nacos'

const nacosConfigClient = new NacosConfigClient({
  serverAddr: '127.0.0.1:8848',
})

export const NACOS_CONFIG_MAP: Map<string, NacosConfig> = new Map()

const subscribedRegs = new Set<string>()

export function getNacosConfigKey(reg: NacosConfigReg) {
  return `${reg.group}-${reg.dataId}`
}

export async function getNacosConfig(
  reg: NacosConfigReg,
): Promise<NacosConfig | undefined> {
  try {
    const configContent = await nacosConfigClient.getConfig(
      reg.dataId,
      reg.group,
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
export function watchNacosConfig(
  reg: NacosConfigReg,
  onChange?: (config: NacosConfig | undefined) => void,
) {
  const key = getNacosConfigKey(reg)

  if (subscribedRegs.has(getNacosConfigKey(reg))) {
    console.log(`请勿重复订阅 Nacos ${key}:`)
    return
  }

  subscribedRegs.add(key)

  nacosConfigClient.subscribe(reg, (content: string) => {
    try {
      const nacosConfig = JSON.parse(content)
      NACOS_CONFIG_MAP.set(key, nacosConfig)

      console.log(`监听 Nacos ${key} 配置变化:`, nacosConfig ?? '配置为空')

      onChange?.(nacosConfig)
    } catch (error) {
      console.error(`解析 Nacos ${key} 配置变化失败:`, error)
    }
  })
}
