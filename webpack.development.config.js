const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distDir = path.join(__dirname, './dist');
const srcDir = path.join(__dirname, './src');

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    bundle: `${srcDir}/scripts/index.js`,
  },
  output: {
    path: distDir,
    filename: 'assets/js/[name].js',
    publicPath: '',
  },
  watch: true,
  watchOptions: {
    ignored: /(node_modules[\\\/])/,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': srcDir,
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules[\\\/])/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: `${__dirname}/postcss.config.js`,
                },
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'assets/css/styles.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
      inject: 'body',
      minify: false,
      hash: false,
      cache: false,
    }),
  ]
};
