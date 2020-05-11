const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
const {getEntries, getName, getPageConfigs} = require("./utils")

// 获取所有的入口configs
const entrieConfigs = getEntries("src/*/config.json");
const { pagesConfig, entries } = getPageConfigs(entrieConfigs)
console.log(pagesConfig)
const themeEntries = { index: path.resolve(__dirname, '../template/main.js') }


const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  devtool: "cheap-module-eval-source-map", // 开放环境用，可以看到报错信息准确的排数
  entry: Object.assign({}, entries, themeEntries),
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
        pagesConfig: pagesConfig,
      },
      chunks: ["index"],
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: "template/static",
    //     to: path.resolve(__dirname, "../dist", "static"),
    //     flatten: false,
    //   },
    // ]),
  ],
};