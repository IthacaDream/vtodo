var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var production = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.DefinePlugin({
    __SERVER__: !production,
    __DEVELOPMENT__: !production,
    __DEVTOOLS__: !production,
    'process.env': {
      BABEL_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main',
    children: true,
    minChunks: 2,
  }),

  /*
  new HtmlwebpackPlugin({
    template: path.join(__dirname, './public/template.html'),
    //inject: 'body',
    filename: path.join(__dirname, './public/index.html')
  }),

  new CleanWebpackPlugin('build', {
    root: path.join(__dirname, './public/static/'),
  })
  */
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({ // uglify
      output: {
        comments: false, // 不要注释了的代码
      },
      mangle: true, // 混淆
      compress: { // 压缩
        warnings: false, // 线上不要出warning
        drop_debugger: true, // 线上不要debug
        drop_console: true // 线上不要出控制台信息
      }
    })
  ]);
} else {
  plugins = plugins.concat([
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
  ])
}


module.exports = {
  entry : {
    "index": path.join(__dirname, 'index.js')
  },
  output : {
    path : path.join(__dirname, './public/static/build'),
    filename : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/build/'
  },
  module : {
    loaders :[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:   /\.(css|scss)$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&localIdentName=[path][name]__[local]--[hash:base64:5]!sass-loader'
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url-load?limit=20000!image-webpack',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: plugins,
  devServer: {
    hot: true,
    headers: {'Access-Control-Allow-Origin': '*'},
  },
  devtool: production ? false : 'source-map' // eval-source-map
}
