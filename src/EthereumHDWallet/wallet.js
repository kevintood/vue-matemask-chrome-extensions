/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-09 15:31:01
 */
import Vue from "vue";
import Popup from "./wallet.vue";
import ElementUI from "element-ui";
import router from "@/router";
import store from "@/store";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import VueClipBoard from "vue-clipboard2";

// 过滤器
import * as filters from "@/filters"; // global filters
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
// 过滤器 end
// ----------
import Web3 from "web3";
let web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  //https://mainnet.infura.io/xxxxxxx
  //http://localhost:8545
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/15482187476697795070848179225741032193"
    )
  );
}
Vue.web3 = Vue.prototype.$web3 = web3;
// -----------

Vue.use(VueClipBoard);

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#popup",
  router,
  store,
  render: (h) => h(Popup)
});
