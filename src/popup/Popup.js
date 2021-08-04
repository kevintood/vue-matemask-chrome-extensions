/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 12:12:04
 */
import Vue from "vue";
import Popup from "./Popup.vue";
import ElementUI from "element-ui";
import router from "@/router";
import store from "@/store";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import VueClipBoard from "vue-clipboard2";

Vue.use(VueClipBoard);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#popup",
  router,
  store,
  render: (h) => h(Popup)
});
