/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 14:23:25
 */
import Vue from "vue";
import Popup from "./Popup.vue";
import ElementUI from "element-ui";
import router from "@/router";
import store from "@/store";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#popup",
  router,
  store,
  render: (h) => h(Popup)
});
