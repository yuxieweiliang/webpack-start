const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const publicPath = path.resolve(__dirname, 'dist');


module.exports = {
  // 坑爹的输出文件顺序竟然是按照字母排序来的
  entry: {
    'js/app': './src/index',
    'js/print': './src/print',
    // 将所有公用的东西都放在一个文件里
    vendors: ['./src/main1', './src/main2', 'lodash', 'react', 'react-dom', 'prop-types']
  },
  // 输出文件
  output: {
    filename: '[name].[chunkhash:6].js',
    path: publicPath
  },
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
    new webpack.ProvidePlugin({
      react: 'react',
      reactDOM: 'reactDOM',
      propTypes: 'prop-types'
    }),
    // 输出一个资源映射的json 似乎没有什么卵用
    new ManifestPlugin({
      fileName: 'manifest.json'
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


    // 抽取公用脚本
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: "js/vendors.js",
      minChunks: Infinity,
    }),
    /**
     * 启用模块热替换
     */
    new webpack.HotModuleReplacementPlugin(),
    // js 压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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



























