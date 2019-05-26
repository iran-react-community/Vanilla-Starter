const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const distDir = path.join(__dirname, './dist');
const srcDir = path.join(__dirname, './src');

module.exports = {
  name: 'client',
  mode: 'development',
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
      inject: 'body',
      minify: false,
      hash: false,
      cache: false,
      showErrors: true,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
  ],
};
