/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-12 14:24:59
 */
import Vue from "vue";
import Popup from "./wallet.vue";
import ElementUI from "element-ui";
import router from "@/router";
import store from "@/store";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import VueClipBoard from "vue-clipboard2";
import testProviders from "@/assets/json/TestProviders.json";
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
  //https://mainnet.infura.io/PROJECT_ID        mainnet，rinkeby，ropsten等测试链地址，如果使用mainnet，rinkeby，ropsten等测试链测试，可以去https://infura.io/dashboard网站注册然后申请这个URL地址。在里面create new project会获取这个PROJECT_ID值，xxx.infura.io中的xxx针对不同的测试链填写。目前我的demo是使用这个rinkeby测试,https://rinkeby.infura.io/PROJECT_ID
  //http://localhost:8545                       本地自己开发的测试链地址
  web3 = new Web3(new Web3.providers.HttpProvider(testProviders.providersUrl));
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
