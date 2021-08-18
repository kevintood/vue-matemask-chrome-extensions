/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-18 19:07:48
 */

const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// test
module.exports = {
  pages: {
    index: {
      template: "./src/EthereumHDWallet/wallet.html",
      entry: "./src/EthereumHDWallet/wallet.js",
      title: "wallet"
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@$", resolve("src"));
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js"
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      APIBASEURL: "APIBASEURL"
    }
  }
};
