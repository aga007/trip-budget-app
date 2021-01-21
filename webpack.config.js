const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  name: 'client',
  mode: 'none',
  entry: {
    // for dev
    // main: ['webpack-hot-middleware/client?reload=true', './src/public/js/index.js'],
    main: ['./src/public/js/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
    filename: 'js/bundle.js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate single bundled file
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // This loader resolves url() and @imports insie CSS
            loader: 'css-loader',
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader',
          },
          {
            // First we transform SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            // Using file-loader for these files
            loader: 'file-loader',

            // In options we can set different things
            // like format and directory to save
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // For Font Awesome
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'webfonts', // where the fonts will go
              //publicPath: '../'       // override the default path
            },
          },
        ],
      },
      {
        test: /\.(ejs)$/,
        loader: 'ejs-compiled-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      filename: '../views/index.ejs',
      favicon: './src/favicon.ico',
      template: '!!ejs-compiled-loader!./src/views/index.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
  ],
};
