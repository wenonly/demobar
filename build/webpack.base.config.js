const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GeneraterAssetPlugin = require("generate-asset-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const fs = require("fs");
const path = require("path");

// 判断父级是不是demobar的父项目
const isParent = fs.existsSync(path.resolve(__dirname, "../../package.json"));
let _config = require("./config");
//
if (isParent && fs.existsSync(path.resolve(__dirname, "../../config.js"))) {
  _config = require("../../config");
}

// let dotenv = require("dotenv");
const {
  getEntries,
  getName,
  getPageConfigs,
  getFormatEntries
} = require("./utils");

// 获取所有的入口configs
let entrieIndexs = {}
if (isParent) {
  entrieIndexs = getEntries("../src/*/*/index.js");
} else {
  entrieIndexs = getEntries("src/*/*/index.js");
}
// 入口中文转字母
const entries = getFormatEntries(entrieIndexs);
// 获取pagesConfig
const pagesConfig = getPageConfigs(entrieIndexs);

// 主题入口
let themeEntries = {
  index: path.resolve(__dirname, `../theme/${_config.theme}/main.js`),
  html: path.resolve(__dirname, `../theme/${_config.theme}/index.ejs`),
  public: `theme/${_config.theme}/public/`
};

if (isParent && fs.existsSync(path.resolve(__dirname, `../../theme/${_config.theme}/main.js`))) {
  themeEntries = {
    index: path.resolve(__dirname, `../../theme/${_config.theme}/main.js`),
    html: path.resolve(__dirname, `../../theme/${_config.theme}/index.ejs`),
    public: path.resolve(__dirname, `../../theme/${_config.theme}/public/`)
  };
}

const mode = process.env.NODE_ENV || "development";

const outPath = path.join(__dirname, isParent ? "../" : "./", "../docs");

function createJson(compilation) {
  return JSON.stringify(pagesConfig);
}

module.exports = {
  mode: mode,
  entry: Object.assign({}, entries, { index: themeEntries.index }),
  output: {
    filename: "[name]/index.js",
    path: outPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"]
                  })
                ];
              }
            }
          },
          "less-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options:
              mode === "development"
                ? {}
                : {
                    limit: 10000, //10K
                    esModule: false,
                    name: "[hash:6].[ext]",
                    publicPath: name => name,
                    outputPath: (url, resourcePath) => {
                      const pathName = getName(resourcePath);
                      return `/${pathName}/${url}`;
                    }
                  }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: true
        }
      },
      {
        test: /\.ejs$/,
        loader: "underscore-template-loader"
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]/main.css",
      chunkFilename: "[name]/[id].css"
    }),
    ...Object.keys(entries).map(name => {
      return new HtmlWebpackPlugin({
        template: entries[name].slice(0, -8) + "index.html",
        filename: name + "/index.html",
        minify: false,
        chunks: [name]
      });
    }),
    // 生成模板页
    new HtmlWebpackPlugin({
      template: themeEntries.html,
      filename: "index.html",
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false
      },
      title: "DEMOBAR",
      templateParameters: {
        pagesConfig: pagesConfig
      },
      chunks: ["index"]
    }),
    new CopyWebpackPlugin([
      {
        from: themeEntries.public,
        to: outPath,
        flatten: false
      }
    ]),
    new GeneraterAssetPlugin({
      filename: "config.json",
      fn: (compilation, cb) => {
        cb(null, createJson(compilation));
      }
    })
  ]
};
