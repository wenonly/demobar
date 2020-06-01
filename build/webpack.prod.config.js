const webpackConfigBase = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path")
console.log(process.env.PUBLICPATH, '---+++++++++++++++==')
const webpackConfigProd = {
    mode: "production",
    plugins:[
      new CleanWebpackPlugin(),
    ]
};
module.exports = merge(webpackConfigBase, webpackConfigProd);