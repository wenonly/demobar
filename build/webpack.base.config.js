const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GeneraterAssetPlugin = require("generate-asset-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const _config = require("./config");

let dotenv = require("dotenv");
const path = require("path");
const {
  getEntries,
  getName,
  getPageConfigs,
  getFormatEntries,
} = require("./utils");

// 获取所有的入口configs
const entrieIndexs = getEntries("src/*/*/index.js");
// console.log(entrieIndexs);
// 入口中文转字母
const entries = getFormatEntries(entrieIndexs);
// console.log(entries);
// 获取pagesConfig
const pagesConfig = getPageConfigs(entrieIndexs);
// console.log(pagesConfig);
const themeEntries = {
  index: path.resolve(__dirname, `../theme/${_config.theme}/main.js`),
  html: path.resolve(__dirname, `../theme/${_config.theme}/index.ejs`),
  public: `theme/${_config.theme}/public/`,
};
// for (let key in pagesConfig) {
//   for (let page of pagesConfig[key].pages) {
//     console.log(page);
//     console.log(page.type, page.title, page.path);
//   }
// }
const mode = process.env.NODE_ENV || "development";
if (mode === "development") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.development") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../.env.production") });
}

const outPath = path.join(__dirname, "../docs");

function createJson(compilation) {
  return JSON.stringify(pagesConfig);
}

module.exports = {
  mode: mode,
  entry: Object.assign({}, entries, { index: themeEntries.index }),
  output: {
    filename: "[name]/[name].js",
    path: outPath,
    publicPath: "",
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
          MiniCssExtractPlugin.loader,
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
                const pathName = getName(resourcePath);
                return `${pathName}/${url}`;
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: true,
        },
      },
      {
        test: /\.ejs$/,
        loader: "underscore-template-loader",
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]/[name].css",
      chunkFilename: "[name]/[id].css",
    }),
    ...Object.keys(entries).map((name) => {
      return new HtmlWebpackPlugin({
        template: entries[name].slice(0, -8) + "index.html",
        filename: name + "/index.html",
        minify: false,
        chunks: [name],
      });
    }),
    // 生成模板页
    new HtmlWebpackPlugin({
      template: themeEntries.html,
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
    new CopyWebpackPlugin([
      {
        from: themeEntries.public,
        to: outPath,
        flatten: false,
      },
    ]),
    new GeneraterAssetPlugin({
      filename: "config.json",
      fn: (compilation, cb) => {
        cb(null, createJson(compilation));
      },
    }),
  ],
};
