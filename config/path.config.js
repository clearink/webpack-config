// 封装一些path
const path = require("path");
function resolve(...relative) {
  return path.resolve(__dirname, ...relative);
}
module.exports = {
  resolve,
  outputPath: resolve("../dist"),
  entryPath: resolve("../src/index.tsx"),
  appPath: resolve("../src"),
  templatePath: resolve("../public/index.html"),
};
