<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 14:20:29
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
  methods: {
    handleSelect(key, keyPath) {
      window.alert(key + typeof key + JSON.stringify(this.$route));
      if (key === "1") {
        alert(2);
        this.$router.replace({ path: "/actionCenter" });
        alert(3 + this.$route.path, JSON.stringify(this.$route));
      } else if (key === "2") {
        alert(4);
        this.$router.replace({ path: "/myWork" });
        alert(
          5 + this.$route.path + " %%%%%%%%% " + JSON.stringify(this.$router)
        );
      }
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
