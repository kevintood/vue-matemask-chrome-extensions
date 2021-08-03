/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 15:49:22
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },

  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  { path: "*", redirect: "/home" }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
