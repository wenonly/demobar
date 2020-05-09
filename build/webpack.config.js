const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtract = require('mini-css-extract-plugin') // 引入插件
const glob = require("glob");
const path = require("path");
const pinyin = require("pinyin");
const pinyinConfig = { style: pinyin.STYLE_NORMAL }

// 获取所有的入口configs
const entrieConfigs = getEntries("src/*/config.json");
const entries = {} // 用于记录入口js
const pagesConfig = [] // 记录所有页面的配置信息和结构
console.log(entrieConfigs)
for (let key in entrieConfigs) {
  // 每一个目录的配置信息，包含入口信息
  const config = require(entrieConfigs[key])
  pagesConfig[key] = []

  const paths = config.path
  for (let pathNode of paths) {
    const src = path.join(__dirname, '../src', key, pathNode.src, 'index.js')
    const name = getName(src)
    console.log(src)
    entries[name] = src
    pagesConfig[key].push(Object.assign(pathNode, {
      path: '/' + name,
      type: key 
    }))
  }
}
console.log(pagesConfig)
const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  devtool: "cheap-module-eval-source-map", // 开放环境用，可以看到报错信息准确的排数
  entry: entries,
  output: {
    filename: "[name]/[name].js",
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    port: "9000", //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true, //是否启用 gzip 压缩
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"],
                  }),
                ];
              },
            },
          },
          "less-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10, //10K
              esModule: false,
              name: "[hash:6].[ext]",
              outputPath: (url, resourcePath) => {
                const pathName = getName(resourcePath)
                return `${pathName}/${url}`;
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /.html$/,
        use: ["html-withimg-loader"],
      },
      {
        test: /\.ejs$/,
        loader: "underscore-template-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...Object.keys(entries).map((name) => {
      return new HtmlWebpackPlugin({
        template: entries[name].slice(0, -8) + "index.html",
        filename: name + "/index.html",
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
        },
        chunks: [name],
      });
    }),
    // 生成模板页
    new HtmlWebpackPlugin({
      template: "template/index.ejs",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
      },
      title: "DEMOBAR",
      templateParameters: {
        entries: entries,
      },
      chunks: ["index"],
    }),
    new CopyWebpackPlugin([
      {
        from: "template/static",
        to: path.resolve(__dirname, "../dist", "static"),
        flatten: false,
      },
    ]),
  ],
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath);
  const entries = {};
  files.forEach(function (filepath) {
    const split = filepath.split("/");
    const name = split[split.length - 2];
    entries[name] = "../" + filepath;
  });
  return entries;
}


// 根据路径生成文件名
function getName(path) {
  const pathArr = path.split('src')[1].split('\\')
  return pinyin(pathArr[1], pinyinConfig).join('') + '_' + pinyin(pathArr[2], pinyinConfig).join('')
}