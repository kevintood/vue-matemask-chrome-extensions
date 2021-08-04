/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-03 11:23:09
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 12:12:12
 */
import Vue from "vue";
import Content from "./Content.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";
import VueClipBoard from "vue-clipboard2";

Vue.use(VueClipBoard);
Vue.use(ElementUI);
new Vue({
  el: "#topnav",
  render: (h) => h(Content)
});
