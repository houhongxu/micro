export const MICRO_APP_ENUM = {
  REACT_HOST: 'react-host',
  REACT_REMOTE: 'react-remote',
  REACT_ADMIN: 'react-admin',
}

export const CONTAINER_ID = '#base-container'

export const MICRO_CONFIG = [
  {
    name: MICRO_APP_ENUM.REACT_HOST,
    entry: 'http://localhost:9001',
  },
  {
    name: MICRO_APP_ENUM.REACT_REMOTE,
    entry: 'http://localhost:9002',
  },
  {
    name: MICRO_APP_ENUM.REACT_ADMIN,
    entry: 'http://localhost:9003',
  },
].map((item) => ({
  ...item,
  activeRule: `/${item.name}`,
  container: CONTAINER_ID,
}))
