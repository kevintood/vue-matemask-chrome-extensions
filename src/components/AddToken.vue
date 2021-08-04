<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-03 14:30:08
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 17:56:26
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div style="font-size: 32px">Add Tokens</div>
      <div style="font-size: 16px; color: #bebebe">Custom Token</div>
    </div>

    <el-form
      :model="tokenData"
      status-icon
      :rules="rules"
      label-position="top"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="Token Contract Address" prop="address">
        <el-input v-model="tokenData.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Token Symbol" prop="symbol">
        <el-input v-model="tokenData.symbol" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Token Decimal" prop="decimal">
        <el-input v-model.number="tokenData.decimal"></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="info" plain @click="resetForm('ruleForm')"
          >Cancel</el-button
        >
        <el-button type="primary" plain @click="submitForm('ruleForm')">
          Next
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AddToken",
  components: {},
  data() {
    return {
      rules: {
        address: [{ trigger: "blur" }],
        symbol: [{ trigger: "blur" }],
        decimal: [{ trigger: "blur" }]
      },
      tokenData: {
        address: "",
        symbol: "",
        decimal: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      location.hash = "";
    }
  }
};
</script>
