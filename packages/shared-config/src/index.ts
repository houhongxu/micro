import { Shared } from '@module-federation/enhanced/dist/src/declarations/plugins/sharing/SharePlugin'

export interface Config {
  webpackExternals: Record<string, string>
  moduleFederationShared: Shared
}

export const sharedConfig: Config = {
  webpackExternals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'high-order-ui': 'HighOrderUI',
  },
  moduleFederationShared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
    'high-order-ui': { singleton: true, eager: true },
  },
}
