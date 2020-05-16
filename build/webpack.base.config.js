const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");
const {getEntries, getName, getPageConfigs} = require("./utils")

// 获取所有的入口configs
const entrieConfigs = getEntries("src/*/config.json");
const { pagesConfig, entries } = getPageConfigs(entrieConfigs)
const themeEntries = { index: path.resolve(__dirname, '../template/main.js') }
for (let key in pagesConfig) {
  for (let page of pagesConfig[key].pages) {
    console.log(page)
    console.log(page.type, page.title, page.path)
  }
}

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  entry: Object.assign({}, entries, themeEntries),
  output: {
    filename: "[name]/[name].js",
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
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
              limit: 10000, //10K
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