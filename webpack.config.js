const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (prod) => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.join(__dirname, 'public')
            }
            }, 'css-loader'
          ],
          test: /\.css/
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name(resourcePath, resourceQuery) {
              // `resourcePath` - `/absolute/path/to/file.js`
              // `resourceQuery` - `?foo=bar`
              return `[path][name]-${Date.now()}.[ext]`
            }
          }
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        }
      ]
    },
    mode: prod ? 'production' : 'development',
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          secure: false
        },
        "/auth": {
          target: "http://localhost:8000",
          secure: false
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'main.css',
        chunkFilename: 'main.css',
      })
    ]
  }
}
