<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-03 14:30:08
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-06 17:33:47
-->
<template>
  <el-card class="box-card">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form
          :model="createAccountInfo"
          status-icon
          :rules="rules"
          label-position="top"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="Account Name" prop="accountName">
            <el-input
              v-model="createAccountInfo.accountName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="info" plain @click="resetForm('ruleForm')"
              >Cancel</el-button
            >
            <el-button type="primary" plain @click="submitForm('ruleForm')">
              Create
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Send",
  props: {},
  components: {},
  data() {
    return {
      createAccountInfo: { accountName: "" },
      rules: {
        accountName: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName);
          let account = this.$web3.eth.accounts.create();
          // console.log(account);
          this.$emit("onCreateAccount", account, this.createAccountInfo);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      location.hash = "";
    }
  }
};
</script>
