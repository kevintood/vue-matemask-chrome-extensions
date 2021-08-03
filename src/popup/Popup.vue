<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 14:17:33
-->
<template>
  <MetaMask />
</template>

<script>
import MetaMask from "@/components/MetaMask.vue";

export default {
  name: "popup",
  components: { MetaMask }
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
