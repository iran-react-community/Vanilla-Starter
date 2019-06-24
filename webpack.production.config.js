const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const distDir = path.join(__dirname, './dist');
const srcDir = path.join(__dirname, './src');

module.exports = {
  name: 'client',
  mode: 'production',
  target: 'web',
  entry: {
    bundle: `${srcDir}/scripts/index.js`,
  },
  output: {
    path: distDir,
    filename: 'assets/js/[name].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js'],
  },
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
              // localIdentName: '[sha256:hash:base64:5]',
              localIdentName: '[local]',
              sourceMap: false,
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
  optimization: {
    minimizer: [new UglifyJsPlugin({
      exclude: /(node_modules[\\\/])/,
    })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
    }),
    new CleanWebpackPlugin(distDir),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
      inject: 'body',
      minify: true,
      hash: true,
      cache: true,
      showErrors: false,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new CopyWebpackPlugin([
      {
        from: `${srcDir}/assets`,
        to: `${distDir}/assets`
      }
    ])
  ]
};
