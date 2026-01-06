export enum MICRO_APP_ENUM {
  'REACT_HOST' = 'react-host',
  'REACT_REMOTE' = 'react-remote',
}

export const CONTAINER_ID = '#base-container'

export const MICRO_CONFIG = [
  {
    name: MICRO_APP_ENUM.REACT_HOST,
    entry: '//localhost:9001',
  },
  {
    name: MICRO_APP_ENUM.REACT_REMOTE,
    entry: '//localhost:9002',
  },
].map((item) => ({
  ...item,
  activeRule: `/${item.name}`,
  container: CONTAINER_ID,
}))
