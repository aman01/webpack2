/* eslint no-console:"off" */
const {resolve} = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpackValidator = require('webpack-validator')
const {getIfUtils} = require('webpack-config-utils')

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  const config = webpackValidator({
    context: resolve('src'),
    entry: {
      app: './bootstrap.js',
      vender: ['todomvc-app-css/index.css'],
    },
    output: {
      filename: 'bundle.js',
      path: resolve('dist'),
      publicPath: '/dist/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
        {test: /\.css$/, loaders: ['style', 'css']},
      ],
    },
    plugins: [
      new ProgressBarPlugin()
    ],
  })
  if (env.debug) {
    console.log(config)
    debugger // eslint-disable-line
  }
  return config
}
