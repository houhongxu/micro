export enum MICRO_APP_ENUM {
  'reactHost' = 'micro-react-host',
  'reactRemote' = 'micro-react-remote',
}

export const CONTAINER_ID = '#base-container'

export const MICRO_CONFIG = [
  {
    name: MICRO_APP_ENUM.reactHost,
    entry: '//localhost:9001',
  },
  {
    name: MICRO_APP_ENUM.reactRemote,
    entry: '//localhost:9002',
  },
].map((item) => ({
  ...item,
  activeRule: `/${item.name}`,
  container: CONTAINER_ID,
}))
