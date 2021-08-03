<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-03 11:23:07
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 14:28:33
-->
<template>
  <div>
    <h1>Hey I am your content.vue component</h1>
    <button @click="changeRoute">改变路由</button>
  </div>
</template>

<script>
export default {
  name: "Content",
  methods: {
    changeRoute() {
      console.log(this.$router);
      // this.$router.push("/test.html");
    }
  }
};
</script>

<style></style>
