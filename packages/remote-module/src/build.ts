import { webpackConfig } from './webpack.config'
import { webpack } from 'webpack'

export function build(entry: string, path: string) {
  const compiler = webpack({
    ...webpackConfig,
    entry,
    output: { ...webpackConfig.output, path },
  })

  compiler.run((stats) => {
    console.log(stats)
  })
}
