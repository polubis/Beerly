const HtmlWebPackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

module.exports = (env, { mode }) => {
  console.log(`App is running in ${mode} mode`);

  return {
    entry: './src/index.tsx',

    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: 'body'
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: 'public'
      })
    ],

    output: {
      path: __dirname + '/dist',
      filename: 'bundle.min.js',
      publicPath: '/'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'json']
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
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]']
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
    },

    devServer: {
      historyApiFallback: true
    }
  };
};
