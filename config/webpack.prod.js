const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { outputPath, appPath } = require("./path.config");
const common = require("./webpack.common");
// 生成环境
module.exports = new SpeedMeasurePlugin().wrap(
  merge(common, {
    mode: "production",
    output: {
      filename: "[name].[contenthash:8].bundle.js",
      path: outputPath, // 输出目录
      clean: true, // 清除目录
    },
    plugins: [
      // 打包体积分析
      // new BundleAnalyzerPlugin({
      //   analyzerMode: "static", // html 文件方式输出编译分析
      // }),

      // 提取css
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new PurgeCSSPlugin({
        paths: glob.sync(`${appPath}/**/*`, { nodir: true }),
      }),
    ],
    optimization: {
      runtimeChunk: true,
      moduleIds: 'deterministic', //让公共包 splitChunks 的 hash 不因为新的依赖而改变
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            format: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin({
          parallel: true,
        }),
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  })
);
