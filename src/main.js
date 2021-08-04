/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 10:43:18
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/style/index.scss";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;
import VueClipBoard from "vue-clipboard2";

Vue.use(VueClipBoard);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
