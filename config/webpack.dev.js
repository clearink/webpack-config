const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const { outputPath } = require("./path.config");
const common = require("./webpack.common");

// 开发环境

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: outputPath, // 输出目录
    clean: true, // 清除目录
  },
  plugins: [
    // 提取 CSS
    new MiniCssExtractPlugin({
      filename: "[hash].[name].css",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  // 开启 source map
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 4000,
    hot: true,
    static: {
      directory: outputPath,
    },
  },
});
