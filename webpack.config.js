const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const publicPath = path.resolve(__dirname, 'dist');


module.exports = {
  // 坑爹的输出文件顺序竟然是按照字母排序来的
  entry: {
    'js/app': './src/index.js',
    'js/print': './src/print.js',
    // 将所有公用的东西都放在一个文件里
    common: ['lodash', 'moment']
  },
  // 输出文件
  output: {
    filename: '[name].[chunkhash:6].js',
    path: publicPath
  },
  //devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.scss', '.js', '.jsx', '.htm', '.json', '.html', '.es6'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      // 打包css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 打包图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  /**
   * 配置外部访问的公共代码
   */
  externals: {
  },
  plugins: [
    // 输出一个资源映射的json 似乎没有什么卵用
    new ManifestPlugin({
      fileName: 'my-manifest.json'
    }),
    // 清除dist下的文件
    // 每次编译的时候，将之前编译的清空
    new CleanWebpackPlugin(['dist']),
    /**
     * 输出的根目录已经在output下设置了，
     * 所以filename只需要写入名字，不需要再添加路径名称，否则找不到，
     * 而且内部的一些输入的连接等都会错误
     */
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
    }),

    // 启动之后用指定浏览器自动打开
    // 然而在script中使用 --open就可以打开，这里写着确实有些没有意义
    /*new OpenBrowserPlugin({
      url: 'http://localhost:8088/',
      delay: 500,
      browser: 'Chrome'
    })*/
    // 全局 React相关
    new webpack.ProvidePlugin({
      'moment': 'moment',
      '_': 'lodash'
    }),

    // 抽取公用脚本
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: "js/common.js",
      minChunks: Infinity,
    }),
    /**
     * 启用模块热替换
     */
    new webpack.HotModuleReplacementPlugin(),

  ],

  // 如果命令行中配置了--port 则会优先命令行
  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: publicPath,
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/'
  }
};



























