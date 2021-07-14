# demobar

使用 webpack 构建方便编写 demo 的多页面框架，适合开发者编写 demo 页面，提供分类预览的功能。

demo 地址: [https://wenonly.github.io/demobar/](https://wenonly.github.io/demobar/)

功能：
- 支持开发热更新
- 自动生成demo菜单，方便查看
- 打包后demo完整分割，不相互依赖，可直接使用demo路径访问，如[https://wenonly.github.io/demobar/donghua/donghuaanniu/](https://wenonly.github.io/demobar/donghua/donghuaanniu/)
- 支持自定义主题
- 中文路径转为拼音路径

## 使用方法

### 方法一
直接`clone`本项目使用。

### 方法二（推荐）
使用模版[https://github.com/wenonly/demo-template](https://github.com/wenonly/demo-template)，方便之后更新`demobar`，不与`demo`项目耦合
- 首先下载项目，或者`fork`中后克隆自己的项目。
```shell
git clone https://github.com/wenonly/demo-template.git --recursive
```
- 然后初始化项目，运行

```shell
npm run init //不是 npm init
npm run serve
```

## 编写demo的方法

1. 每一个demo必须有一个分类，只需要在src中创建分类目录。
2. 在分类目录中添加单个demo的目录，里面必须包含`index.js`、`index.html`。
3. 在`src`目录下开发demo，需要创建目录结构`src/{分类}/{demo名称}`。

## 打包和部署

在根目录运行`npm run build`，项目将打包到`docs`目录。
之后可以在`github`中部署`gitpage`页面。

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

## 截图

![demo](https://raw.githubusercontent.com/wenonly/demobar/master/screenshot/20210107172645.jpg "demo主页")

