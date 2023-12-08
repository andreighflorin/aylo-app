const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    filename: "app.min.js",
    path: __dirname + "/dist",
  },
  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require("terser-webpack-plugin");
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            mangle: true,
          },
        }).apply(compiler);
      },
    ],
  },
};
