<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 16:15:30
-->
<template>
  <div>{{ versionText }}</div>
</template>

<script>
import { version } from "@/api/user";
export default {
  name: "MetaMask",
  data() {
    return { versionText: "", activeIndex: "1" };
  },
  mounted() {
    browser.runtime.sendMessage({});

    version().then((res) => {
      console.warn(33, res);
      this.versionText = res;
    });
  },
  computed: {
    defaultText() {
      return browser.i18n.getMessage("extName");
    }
  },
  methods: {}
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
