const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Plugin to generate HTML file.
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      // Plugin to create custom service worker.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      // Plugin to create manifest.json file.
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: 'JATE',
        short_name: 'JATE',
        description: 'Write code, even offline!',
        orientation: 'portrait',
        display: 'standalone',
        start_url: './',
        crossorigin: null,
        inject: true,
        fingerprints: false,
        publicPath: './',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        ios: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        // Prevent browser confusion on loading source maps
        {
          test: /\.(m?js|map)$/,
          enforce: 'pre',
          use: ['source-map-loader']
        }
      ],
    },
  };
};
