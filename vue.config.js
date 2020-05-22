const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
module.exports = {
  // 基本路径
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // webpack-dev-server 相关配置
  devServer: {
    // port: 8080,
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch-index");
    // 移除 preload 插件
    config.plugins.delete("preload-index");
  },
  // 警告 webpack 的性能提示
  configureWebpack: {
    performance: {
      hints: "warning",
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    },
    externals: {
      AMap: "AMap",
      AMapUI: "AMapUI"
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      }),
      // To strip all locales except “en”
      new MomentLocalesPlugin(),

      // Or: To strip all locales except “en”, “es-us” and “ru”
      // (“en” is built into Moment and can’t be removed)
      new MomentLocalesPlugin({
        localesToKeep: ["es-us", "ru"]
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false, // Must be set to true if using source-maps in production
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    }
  }
};
