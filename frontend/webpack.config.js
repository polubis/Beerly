const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, { mode }) => {
  console.log(`App is running in ${mode} mode`);

  return {
    entry: './src/index.js',

    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: 'body'
      })
    ],

    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        },
        {
          test: /\.(config)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        }
      ]
    }
  };
};
