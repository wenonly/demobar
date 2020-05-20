const webpackConfigBase = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path")
const webpackConfigProd = {
    mode: "production",
    output: {
      filename: "[name]/[name].js",
      path: path.join(__dirname, '../docs'),
      publicPath: '',
    },
    plugins:[
      new CleanWebpackPlugin(),
    ]
};
module.exports = merge(webpackConfigBase, webpackConfigProd);