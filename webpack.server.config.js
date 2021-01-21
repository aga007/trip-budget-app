const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  entry: {
    server: './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app_bundle.js'
  },
  target: 'node',// in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals({ // Need this to avoid error when working with Express
    whitelist: ['webpack/hot/dev-server']
  })], 
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}

