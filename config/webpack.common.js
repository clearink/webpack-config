const { entryPath, appPath, templatePath } = require("./path.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const WebPackBarPlugin = require("webpackbar");
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": appPath,
    },
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  entry: {
    index: entryPath,
  },
  module: {
    rules: [
      {
        // webpack 5 新增 loader 专门处理静态资源
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: appPath,
        type: "asset/resource",
      },
      {
        // 解析字体
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: appPath,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        // include: appPath,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
        ],
      },
      {
        // 解析 css 文件
        test: /\.(scss|sass)$/,
        include: appPath,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: appPath,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es6",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebPackBarPlugin({ profile: true }),
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      template: templatePath,
    }),
  ],
  output: {
    pathinfo: false,
  },
};
