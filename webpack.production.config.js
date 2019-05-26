const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'assets/css/styles.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
    }),
    new CleanWebpackPlugin(distDir),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
      inject: 'body',
      minify: true,
      hash: true,
      cache: true,
    }),
  ]
};
