const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
   rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },

        {
          test: /\.(scss|sass|css)$/,
          use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader' },
              { loader: 'postcss-loader',
                  options: {
                    plugins: () => [autoprefixer({ grid: false})]
                  }
              },
              {
                loader: 'fast-sass-loader',
                options: {
                  includePaths: [  path.resolve(__dirname, 'src'), path.resolve(__dirname, 'src','styles') ,'./node_modules', '/node_modules/materialize-css/sass/components'],
                  sourceMap: true
                }
              }
          ]

        },
        {
          test: /\.(jpg|png)$/,
          loader: 'url-loader',
          options: {
            limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
          },
        },
        {    
          test: /\.svg/,
          use: {
            loader: 'svg-url-loader',
            options: {}
          }
        },
         {
            test: /\.mp3$/,
            loader: 'file-loader'
        },

      ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      routes: path.resolve(__dirname, 'src', 'routes'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      public: path.resolve(__dirname, 'public')
    },
  },
  devtool: 'source-map',
  plugins: [HtmlWebpackPluginConfig]
 }
