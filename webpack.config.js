/*
 * @Descripttion: webpack.config.js
 * @version:
 * @@Company: DCIT-SH
 * @Author: Oneself
 * @Date: 2020-11-30 13:16:28
 * @LastEditors: Oneself
 * @LastEditTime: 2020-11-30 17:02:26
 * @Statu: TODO:
 */
const path = require("path");
// 引入html插件文件
const HtmlWebPackPlugin = require("html-webpack-plugin");
// css
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
//css压缩
let OptimizeCss = require("optimize-css-assets-webpack-plugin");
// js压缩
let UglifyjsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  // 多入文件
  entry: {
    index: "./src/index.js", // 前台入口
    admin: "./src/admin.js", // 后台入口
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 定义输出目录
    filename: "[name].js", // 定义输出文件名称  [name]自动获取入口的home和admin, 将entry中的键提取出来
    publicPath: "/", //build之后的公共路径
  },
  devServer: {
    hot: true, // 热替换
    contentBase: path.join(__dirname, "dist"), // server文件的根目录
    progress: true, //开启进度条
    compress: true, // 开启gzip
    //open:true, //自动打开浏览器,
  },
  plugins: [
    new HtmlWebPackPlugin({
      // template是模板文件需要我们创建
      template: "./public/index.html",
      filename: path.resolve(__dirname, "dist/index.html"),
      chunks: ["index"], //只引用index.js,解决index.html里面有index.js和admin.js的问题
      minify: {
        //折叠换行true不换行
        collapseWhitespace: true,
      },
      hash: true, //生产环境下生成hash戳
    }),
    new HtmlWebPackPlugin({
      // template是模板文件需要我们创建
      template: "./public/admin.html",
      filename: path.resolve(__dirname, "dist/admin.html"),
      chunks: ["admin"], //只引用index.js,解决index.html里面有index.js和admin.js的问题
      minify: {
        //折叠换行true不换行
        collapseWhitespace: true,
      },
      hash: true, //生产环境下生成hash戳
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
  ],
  //模块
  module: {
    //规则
    rules: [
      {
        test: /\.(js | jsx)$/,
        use: [
          MiniCssExtractPlugin.loader, //都放到了上面的main.css里面
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader", //file-loader加载图片，url-loader图片小于多少k用base64显示
          options: {
            limit: 100 * 1024, //小于100k用base64
            //build之后的目录分类
            outputPath: "static/images",
          },
        },
      },
      {
        test: /\.js$/, //支持require('*.js')文件
        use: {
          loader: "babel-loader",
          options: {
            //用babel-loader 需要把es6-es5
            presets: ["@babel/preset-env",'@babel/preset-react'],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
        include: path.resolve(__dirname, "src"), //需要转换的文件夹
        exclude: /node_modules/, //排除转换的文件夹
      },
    ],
  },
  optimization: {
    //优化项启动后mode模式代码压缩不再生效，必须配置js压缩插件
    minimizer: [
      new OptimizeCss(), //优化css
      new UglifyjsPlugin({
        cache: true, //是否用缓存
        parallel: true, //是否并发打包
        sourceMap: true, //es6映射es5需要用
      }),
    ],
  },
};
