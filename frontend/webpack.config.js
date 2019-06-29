const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, { mode }) => {
  console.log(`App is running in ${mode} mode`);

  return {
    entry: './src/index.tsx',

    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: 'body'
      })
    ],

    output: {
      path: __dirname + '/dist',
      filename: 'bundle.min.js'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js']
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
          test: /\.tsx?$/, 
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]'],
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
