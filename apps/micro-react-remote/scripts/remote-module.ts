import path from 'path'
import { build } from 'remote-module'

function run() {
  const entry = path.join(__dirname, '..', './src/remote/index.ts')
  const path1 = path.join(__dirname, '..', './dist/remote')

  build(entry, path1)
}

run()
