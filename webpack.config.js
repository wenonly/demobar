const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtract = require('mini-css-extract-plugin') // 引入插件
const glob = require("glob");
const path = require("path");

const entries = getEntries("src/**/index.js");
const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  devtool: "cheap-module-eval-source-map", // 开放环境用，可以看到报错信息准确的排数
  entry: entries,
  output: {
    filename: "[name]/[name].js",
    path: __dirname + "/dist",
    // publicPath: '/',
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
        /**
         * style-loader 动态创建 style 标签，将 css 插入到 head 中.
            css-loader 负责处理 @import 等语句。
            postcss-loader 和 autoprefixer，自动生成浏览器兼容性前缀 —— 2020了，应该没人去自己徒手去写浏览器前缀了吧
            less-loader 负责处理编译 .less 文件,将其转为 css
            loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行，上面 loader 的执行顺序为: less-loader ---> postcss-loader ---> css-loader ---> style-loader
         */
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
              name: "/img/[name]_[hash:6].[ext]",
              // outputPath: '/assets/img'
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
        template: entries[name].replace("/index.js", "") + "/index.html",
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
    ...Object.keys(entries).map((name) => {
      return new CopyWebpackPlugin([
        {
          from: "src/" + name + "/static/*",
          to: path.resolve(__dirname, "dist", name, "static"),
          flatten: true,
        },
      ]);
    }),
    new CopyWebpackPlugin([
      {
        from: "template/public",
        to: path.resolve(__dirname, "dist", "public"),
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
    entries[name] = "./" + filepath;
  });
  return entries;
}
