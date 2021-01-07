# demobar

使用 webpack 构建方便编写 demo 的多页面框架，适合开发者编写 demo 页面，提供分类预览的功能。

demo 地址: [https://iwowen.github.io/demobar/](https://iwowen.github.io/demobar/)

## 使用方法

### 方法一
直接`clone`本项目。

### 方法二（推荐）

使用模版[https://github.com/iwowen/demo-template](https://github.com/iwowen/demo-template)
  - 首先下载项目，或者`fork`中后克隆自己的项目。
  ```shell
  git clone https://github.com/iwowen/demo-template.git --recursive
  ```
  - 然后初始化项目，运行

  ```shell
  npm init
  ```

### 编写demo的方法
```
1. 每一个demo必须有一个分类，只需要在src中创建分类目录
2. 在分类目录中添加单个demo的目录，里面必须包含`index.js`、`index.html`
```


## 打包部署

将打包到`docs`目录, 直接通过 `gitpages` 部署

## webpack 封装内容

- babel-loader 将 JS 转义为低版本
- html-webpack-plugin 在浏览器中查看页面，打包 html
- webpack-dev-server 开发实时查看效果
- devtool 可以帮助我们将编译后的代码映射回原始源代码
- css 相关 loader style-loader css-loader postcss-loader autoprefixer less-loader
- clean-webpack-plugin 每次打包前清空 dist 目录
- copy-webpack-plugin copy 静态文件目录
- underscore-template-loader 处理 ejs 文件中的引入
- webpack-bundle-analyzer 可以看到项目各模块的大小，可以按需优化
- open-browser-webpack-plugin 自动打开浏览器
- mini-css-extract-plugin 分离 css
