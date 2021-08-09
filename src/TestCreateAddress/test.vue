<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-03 11:23:07
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-06 16:07:08
-->
<template>
  <div>
    <h1>Hey I am your content.vue component</h1>
    <button @click="createAccount">创建账号</button>
  </div>
</template>

<script>
export default {
  name: "test",
  mounted() {
    console.log(22);
  },
  methods: {
    createAccount() {
      let account = this.$web3.eth.accounts.create();
      console.log(account);
      // this.createInfo.address = account.address;
      // this.createInfo.privateKey = account.privateKey;
      // this.createInfo.keystore = this.$web3.eth.accounts.encrypt(
      //   account.privateKey,
      //   this.createInfo.pwd
      // );
    }
  }
};
</script>

<style></style>
