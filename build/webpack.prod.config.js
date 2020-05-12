const webpackConfigBase = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackConfigProd = {
    mode: "production",
    plugins:[
      new CleanWebpackPlugin(),
    ]
};
module.exports = merge(webpackConfigBase, webpackConfigProd);