const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    main: [
      './src/main.js',
    ],
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: path.resolve(__dirname, 'lib'), // Path of output file
    filename: 'build/[name].js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('build/[name].css'),
  ],
  module: {
    rules: [
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {loader: "css-loader"},
            {loader: "sass-loader"},
          ]
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
};

module.exports = config;