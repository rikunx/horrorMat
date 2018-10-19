const path = require('path');

const webpack = require('webpack');
const CreateHtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WriteFilePlugin = require('write-file-webpack-plugin');

function webpackConfig(env = {}) {
  const { production } = env;
  const mode = production ? 'production' : 'development';
  const plugins = [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: `"${mode}"`,
          STATIC_SERVER_HOST: `"${process.env.STATIC_SERVER_HOST || ''}"`,
          STATIC_SERVER_PORT: `"${process.env.STATIC_SERVER_PORT || ''}"`,
          API_SERVER_HOST: `"${process.env.API_SERVER_HOST || ''}"`,
          API_SERVER_PORT: `"${process.env.API_SERVER_PORT || ''}"`,
          API_SERVER_PATH: `"${process.env.API_SERVER_PATH || ''}"`,
          APP_DEBUG: process.env.APP_DEBUG
        }
      }
    }),
    new CreateHtmlPlugin({
      title: 'App',
      chunks: 'app',
      hash: true,
      filename: path.join(__dirname, 'dist/index.html'),
      template: path.join(__dirname, 'createHtmlTemplate.ejs'),
      inject: 'body'
    }),
    new CleanPlugin(path.join(__dirname, 'dist')),
    new WriteFilePlugin()
  ];
  return {
    mode,
    entry: { app: path.join(__dirname, 'script/index.js') },
    output: {
      library: 'app',
      libraryTarget: 'window',
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundled.js'
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react'],
                plugins: [
                  'syntax-object-rest-spread',
                  'syntax-class-properties',
                  'transform-object-rest-spread',
                  [
                    'prismjs',
                    {
                      languages: ['json'],
                      theme: 'tomorrow',
                      css: true
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.(styl|css)$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return autoprefixer({
                    browsers: ['last 2 versions']
                  });
                }
              }
            },
            'stylus-loader'
          ]
        },
        {
          test: /\.(woff2|woff)$/,
          use: 'url-loader'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|jpg|png)$/,
          exclude: /node_modules/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: { extensions: ['.jsx', '.js', '.styl', '.css'] },
    devServer: {
      host: '0.0.0.0',
      inline: true,
      port: 8888,
      overlay: true,
      contentBase: path.join(__dirname, 'dist')
    },
    plugins
  };
}

module.exports = webpackConfig;
