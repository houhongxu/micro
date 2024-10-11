export enum APP_ENUM {
  'reactHost' = 'micro-react-host',
  'reactRemote' = 'micro-react-remote',
  'vue' = 'micro-vue',
}

export const CONTAINER_ID = '#base-container'

export const MICRO_CONFIG = [
  {
    name: APP_ENUM.vue,
    entry: '//localhost:9000',
  },
  {
    name: APP_ENUM.reactHost,
    entry: '//localhost:9001',
  },
  {
    name: APP_ENUM.reactRemote,
    entry: '//localhost:9002',
  },
].map((item) => ({
  ...item,
  activeRule: `${item.name}`,
  container: CONTAINER_ID,
}))
