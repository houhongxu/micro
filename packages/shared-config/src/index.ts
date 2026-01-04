export interface Config {
  configPrefix: string
  version: Record<string, string>
  htmlEntry?: { cssLinks: string; jsScripts: string }
  externals: Record<string, string>
}

export const sharedConfig: Record<string, Config> = {
  dev: {
    configPrefix: 'https://unpkg.com',
    version: { react: '18.2.0' },
    externals: { react: 'React', 'react-dom': 'ReactDOM' },
  },
}
