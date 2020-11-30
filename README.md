> 最近有个项目需要react，我尼玛是个忠实的Vue党，但是粑粑还是粑粑，开始学习，本教程只适合于新手，或者学生党，我会竟可能的写详细，大家一起学习

## 01脚手架安装  
一般项目脚手架安装，然后进行开发
```
npm install -g create-react-app
create-react-app demo
cd demo
yarn start
```
## 目录结构 
```
demo/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
    manifest.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```
## 02 webpack流程化安装 
主要是为了熟悉react的目录结构，指令什么的，以及一些基础的webpack，会有很多配置的东西

**01创建目录**
```
mkdir react-demo // 新建项目文件夹
cd react-demo // cd到项目目录下
npm init // npm初始化
```
**webpack 的一些操作**
```
npm i  webpack webpack-cli --save--dev
touch webpack.config.js
```
 ```webpack配置文件 ```
```
/*
 * @Descripttion:  webpack.config.js 
 * @version:  ON||FOR
 * @@Company: DCIT-SH
 * @Author: Oneself
 * @Date: 2020-11-27 16:37:06
 * @LastEditors: Oneself
 * @LastEditTime: 2020-11-27 16:39:44
 * @Statu: TODO:    webpack配置文件 
 */
const path = require('path');
module.exports = {
  entry: './src/app.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 定义输出目录
    filename: 'bundle.js'  // 定义输出文件名称
  }
};
```

```package.json``` 添加webpack执行命令

```
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```
因为我们的入口文件是'./src/app.js'，而我们执行build的时候会先到入口文件，我感觉的这个就像是thinkphp或者一些后端框架的 index.php，或者admin.php （意思上）而现在我们并没有入口文件，创建src目录，创建app.js

```
npm run build
```
在我们的根目下会生成一个```dist目录```，一个```bundle.js```


**webpack-dev-server**
webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。

```
npm install --save-dev webpack-dev-server
```
```package.json``` 更新命令

```
"scripts": {
    "dev":"webpack-dev-server"
}
```
添加配置 
webpack.config.js新增devServer配置
```
devServer: {
  hot: true, // 热替换
  contentBase: path.join(__dirname, 'dist'), // server文件的根目录
  progress:true,//开启进度条
  compress: true, // 开启gzip
 //open:true, //自动打开浏览器,
  port: 8080, // 端口
},
```

报错 Cannot find module 'webpack-cli/bin/config-yargs'
这个错误格外的眼熟，刚学webpack时候就遇到过，
```package.json``` 改成如下版本
方法1：前提是你知道你依赖的版本
```
"webpack-dev-server": "^依赖版本"
删除node_modules文件夹
npm i 
```
方法2：最新版本
```
npm uninstall webpack-dev-server -g       卸载全局
npm uninstall webpack-dev-server -D      卸载局部(本地) 
npm install webpack-dev-server --save-dev      最新
```
方法3 看下以前项目的启动版本
```
 npm i webpack@4.43.0 webpack-cli@3.3.12 webpack-dev-server@3.11.0 webpack-dev-server -D
```
麻蛋的又报错了
```
Error: spawn cmd.exe ENOENT
```
看到这个错误的时候，我们就要考虑下， cmd.exe 
定位错误的话，应该是我们的电脑问题，一般是环境变量，
在后端的日常中，我们会调用一些exe程序进行加密，拆解，拼图，会因为你的exe文件没有配置到电脑的环境变量，而找不到程序，
我查了下 cmd.exe是用户环境变量中加入System32
[添加环境变量](https://blog.csdn.net/ASJBFJSB/article/details/79338212?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)
[cmd.exe 在哪个文件夹](https://jingyan.baidu.com/article/6079ad0ed4c84728ff86dbdc.html)
![](https://upload-images.jianshu.io/upload_images/2903481-81ee67c0f4e02eff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```C:\Windows\System32``` 
还是不行，我百度了下，需要重启下电脑。我坲了
![](https://upload-images.jianshu.io/upload_images/2903481-3b2760f71115e53b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

OK重启后可以正常启动

**安装 HtmlWebPackPlugin**
 说白就是html生成器，HTML模板插件 让webpack 简化了HTML文件的创建
[HtmlWebPackPlugin]( https://www.webpackjs.com/plugins/html-webpack-plugin/)
为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
```
npm install --save-dev html-webpack-plugin
```
```webpack.config.js 添加配置  添加在 module.exports  ```
```
// 引入html插件文件
const HtmlWebPackPlugin = require('html-webpack-plugin');
---------------------------
plugins: [
  new HtmlWebPackPlugin({
    // template是模板文件需要我们创建 
    template: './public/index.html',
    filename: path.resolve(__dirname, 'dist/index.html')，
    minify: {
                //true不换行
                collapseWhitespace: true
            },
    hash: true //生产环境下生成hash戳
  })
]
 npm run dev 
```
多页面应用，我在网上看的时候，这个东西用的不是很多，但是有些面试题会问，多页面应用说白了就是多个入口，和后端那些框架的设计模式差不多，
```webpack.config.js```
```
module.exports = {
// 多入文件
    entry: {
        index: "./src/index.js", // 前台入口 
        admin: "./src/admin.js"  // 后台入口
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 定义输出目录
        filename: '[name].js',  // 定义输出文件名称  [name]自动获取入口的home和admin, 将entry中的键提取出来
        publicPath: "/"  //build之后的公共路径
    },
     plugins: [
        new HtmlWebPackPlugin({
            // template是模板文件需要我们创建 
            template: './public/index.html',
            filename: path.resolve(__dirname, 'dist/index.html'),
            chunks:['index'],//只引用index.js,解决index.html里面有index.js和admin.js的问题
            minify: {
                //折叠换行true不换行
                collapseWhitespace: true
            },
            hash: true //生产环境下生成hash戳

        }),
        new HtmlWebPackPlugin({
            // template是模板文件需要我们创建 
            template: './public/admin.html',
            filename: path.resolve(__dirname, 'dist/admin.html'),
            chunks:['admin'],//只引用index.js,解决index.html里面有index.js和admin.js的问题
            minify: {
                //折叠换行true不换行
                collapseWhitespace: true
            },
            hash: true //生产环境下生成hash戳
        })
    ]
}
```
感觉我注释写的很清楚了，简单的说就是添加几个辨别项，将单页面转化为多页面，记得根据入口文件新建文件```entry```下现在是两个入口文件
```
 npm run build
```
在我们指定的目录下会生成```dist``` index.js index.html ,admin.js admin.js 但是我看到了警告，
```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```
ε=(´ο｀*)))唉，我给忘了一个mode，虽然不印象打包，但是还是看着挺难受的，在 ```module.exports ```中配置
```
 //模式 默认两种production(生产环境:代码压缩) development(开发环境:代码不压缩)
    mode: "development",
```
**loaders 配置css**
```
npm install --save-dev css-loader style-loader mini-css-extract-plugin
```
css-loader：解析@import这种语法
style-loader：把css插入到head标签中
mini-css-extract-plugin:抽离css样式让index.html里面的css样式变成link引入

配置 ```webpack.config.js```
```javascript
let MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
// 在插件中引用 
plugins: [
 new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
]
// 在模块中,配置不同的规则 
  module: {
    //规则
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //都放到了上面的main.css里面
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
```
然后我们测试下,看看是否将css引用了,在src目录下新建**assets**目录,新建两个css文件,在index.js中
```css
@import '你放置css的位置'
```
```
npm run dev 
/*就会发现,你写的css已经加载到css中了, @import也可以在css中使用,将公共的类,和当前css*/
npm run build
/*就会生成对应配置的目录结构 .  static/css/main.css
```
**css兼容性处理**
```
npm install --save postcss-loader autoprefixer
```
**配置 css 兼容性**   ```webpack.config.js``` 
```
// 在css 规则 中添加 一个新的postcss-loader规则 写在css配置的use中 
{ loader: "postcss-loader" },
```
在根目录下新建 ```postcss.config.js ``` 配置浏览器建兼容
```
module.exports = {
    plugins: {
        'autoprefixer': {
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8"
          ]
        }
    }
};
```
打包后查看我们的dist文件夹下css,自动生成css文件 
```css
    -webkit-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
            transform: rotate(60deg);
```
webpack.config.js 配置会越来越大，位置会越来越多，建议学习下 webpack

**配置 css 压缩** 
```
npm install --save optimize-css-assets-webpack-plugin

//引入css压缩
let OptimizeCss = require("optimize-css-assets-webpack-plugin");
// 添加配置 
 optimization: {
    minimizer: [
      new OptimizeCss(), //优化css
    ],
  },
```
需要配置mode模式
**配置 js 压缩** 
```
npm install --save uglifyjs-webpack-plugin
//js压缩
let UglifyjsPlugin=require('uglifyjs-webpack-plugin');
minimizer: [
	    //压缩js    
	    new UglifyjsPlugin({
                cache:true, //是否用缓存
                parallel:true, //是否并发打包
                sourceMap:true //es6映射es5需要用
            }), 
]
```
**配置 图片 ** 
```
npm install --save-dev url-loader

// 配置 
module:{
      rules: [       
         {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:{
                    loader:"url-loader", //file-loader加载图片，url-loader图片小于多少k用base64显示
                    options: {
                        limit:100*1024, //小于100k用base64
                        //build之后的目录分类
                        outputPath:'static/images'                    },
                }
            },
       ]
}

```
**es6转es5 配置**
```
npm install --save babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/runtime
```


**安装react**
```
npm i react react-dom --save
npm i babel-preset-react --save-dev

```
**安装babe**
```
npm install babel-loader@next @babel/core @babel/preset-react @babel/runtime --save
```
##### Babel 是一个 JavaScript 编译器 （说白就是为了解析js代码）

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：
*   语法转换
*   通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 [@babel/polyfill](https://www.babeljs.cn/docs/babel-polyfill) 模块)
*   源码转换 (codemods)
**更新```webpack.config.js```**
```
 module: {
    rules: [
      {
        test: /\.(js | jsx)$/, // 因为react是jsx，需要添加jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}

```

更新```index.js```

```
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component{
    render(){
        return(
            <div>Hello React!</div>
    )
    }
}
export default App;

ReactDOM.render(<App />, document.getElementById("app"));

```

将index.js  ```ReactDOM.render(<App />, document.getElementById("app"));``` 抛出的节点绑定到文件流中
更新```public/index.html```
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 首页 </title>
</head>
<body>
    <div id="app">
        
    </div>
   
</body>
</html>
```
