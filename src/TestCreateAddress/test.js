/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-03 11:23:09
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-06 16:04:08
 */
import Vue from "vue";
import test from "./test.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import VueClipBoard from "vue-clipboard2";
import Web3 from "web3";
// javascript lib
let web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  //https://mainnet.infura.io/xxxxxxx
  //http://localhost:8545
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080/"));
}

Vue.web3 = Vue.prototype.$web3 = web3;
Vue.use(VueClipBoard);
Vue.use(ElementUI);
new Vue({
  el: "#test",
  render: (h) => h(test)
});
