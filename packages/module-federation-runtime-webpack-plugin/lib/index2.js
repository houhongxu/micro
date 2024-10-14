/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// Reference: https://github.com/module-federation/nextjs-mf

// eslint-disable-next-line import/no-extraneous-dependencies
const ConcatSource = require('webpack-sources/lib/ConcatSource')

module.exports = class ModuleFedSingleRuntimePlugin {
  constructor(options) {
    this._options = { fileName: 'remoteEntry.js', ...options }
  }

  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.emit.tap('ModuleFedSingleRuntimePlugin', (compilation) => {
      const { assets, namedChunks } = compilation
      const runtimeChunk = namedChunks.get('runtime')
      if (!runtimeChunk) {
        throw new Error(
          'No runtime single configured, so use of the plugin not required',
        )
      }
      const runtime = assets[runtimeChunk.files[0]]

      const remoteName = this._options.fileName
      if (!remoteName) {
        throw new Error(
          'No remote file configured, please pass fileName:{myRemote.js} in options',
        )
      }
      const remoteEntry = assets[remoteName]
      if (!remoteEntry) {
        throw new Error(
          `No remote entry ${remoteName} found, please make sure module federation configured properly else you dont need this plugin`,
        )
      }
      const mergedSource = new ConcatSource(runtime, remoteEntry)
      assets[this._options.fileName] = mergedSource
    })
  }
}
