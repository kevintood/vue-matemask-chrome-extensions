/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-09 19:01:41
 */

const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pages: {
    popup: {
      // 扩展程序弹窗
      template: "./src/popup/Popup.html",
      entry: "./src/popup/Popup.js",
      title: "Popup"
    },
    content: {
      // 可以用于扩展程序背景页面
      template: "./src/content/Content.html",
      entry: "./src/content/Content.js",
      title: "content"
    },
    index: {
      // 扩展程序
      template: "./src/popup/Popup.html",
      entry: "./src/popup/Popup.js",
      title: "Popup"
      // 钱包
      // template: "./src/EthereumHDWallet/wallet.html",
      // entry: "./src/EthereumHDWallet/wallet.js",
      // title: "wallet"
      // // vue启动展示的页面，必须设置，否则页面不显示
      // template: "public/index.html",
      // entry: "./src/main.js",
      // title: "MetaMask"
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
