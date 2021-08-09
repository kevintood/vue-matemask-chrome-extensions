<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-09 18:55:45
-->
<template>
  <div>
    <el-divider content-position="left">mnemonic code</el-divider>
    {{ mnemonic }}

    <el-divider content-position="left">seed</el-divider>
    {{ seed }}
    <el-divider content-position="left">Master Key</el-divider>
    {{ hdWallet }}
    <el-divider></el-divider>
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column prop="keyName" label="Path" width="180">
      </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
      <el-table-column prop="publicKey" label="publicKey"> </el-table-column>
      <el-table-column prop="privateKey" label="privateKey"> </el-table-column>
    </el-table>
    <el-divider content-position="left">发起签名交易</el-divider>
    <p style="color: red">
      注：交易将从列表中的第一个钱包({{
        tableData[0].address
      }})转账给第二个钱包({{
        tableData[1].address
      }})，确保交易成功，请使用metamask中有代币的钱包向第一个钱包转账,交易来源钱包必须有余额才能转账。设置转账的代币为0。请转账成功前不要刷新页面，避免重新生成所有钱包。
    </p>
    <el-button type="" @click="submit">提交</el-button>
  </div>
</template>

<script>
const EthereumTx = require("ethereumjs-tx").Transaction;
var bip39 = require("bip39");
import { hdkey } from "ethereumjs-wallet";
var util = require("ethereumjs-util");
const ethers = require("ethers");
export default {
  name: "wallet",
  components: {},
  data() {
    return {
      userInfo: {},
      visible: false,
      mnemonic: null,
      seed: null,
      hdWallet: null,
      tableData: [],
      msg: ""
    };
  },
  async mounted() {
    this.mnemonic = bip39.generateMnemonic();
    let seed = await bip39.mnemonicToSeed(this.mnemonic);

    this.seed = seed.toString("hex");

    console.log("seed = ", this.seed);
    this.hdWallet = hdkey.fromMasterSeed(this.seed);
    console.log("Master Key: ", this.hdWallet);

    for (let i = 0; i <= 10; i++) {
      console.log("---------------------------------------------------------");
      let item = {};
      item.keyName = "m/44'/60'/0'/0/" + i;
      item.key = this.hdWallet.derivePath("m/44'/60'/0'/0/" + i);
      console.log("key" + i, item.key);
      item.publicKey = "0x" + item.key._hdkey._publicKey.toString("hex");
      item.privateKey = "0x" + item.key._hdkey._privateKey.toString("hex");

      item.keystore = this.$web3.eth.accounts.encrypt(
        item.privateKey,
        "123456"
      );
      console.warn("加密 = ", item.keystore);
      let address = util.pubToAddress(item.key._hdkey._publicKey, true);
      item.address = util.toChecksumAddress("0x" + address.toString("hex"));

      let account = null;
      try {
        account = this.$web3.eth.accounts.decrypt(
          JSON.stringify(item.keystore),
          "123456"
        );
      } catch (e) {
        console.log("sendDecryptWalletError", e);
        this.$message.error("解码错误");
        return;
      }

      console.warn("解密 = ", account, account.privateKey);
      //Signs an Ethereum transaction with a given private key

      this.tableData.push(item);
    }
  },
  methods: {
    /**
     * @Descripttion: 三步骤发送签名交易
     * @param {*}
     * @return {*}
     */
    sendTransaction1() {
      // 发送签名交易,三步骤：
      // 1.构造交易
      // 2.交易签名
      // 3.发送（广播）交易

      // 1、构造交易
      const privateKey = this.tableData[0].key._hdkey._privateKey;
      const txParams = {
        nonce: "0x00",
        gasPrice: "0x09184e72a000",
        gasLimit: "0x2710",
        to: "0x0000000000000000000000000000000000000000",
        value: "0x00",
        chainId: 3,
        data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057"
      };
      // 2.交易签名
      const tx = new EthereumTx(txParams);
      tx.sign(privateKey);
      const serializedTx = tx.serialize();
      console.log("serializedTx = ", serializedTx);
      // 3.发送（广播）交易
      this.$web3.eth.sendRawTransaction(
        serializedTx,
        function (err, transactionHash) {
          console.log(err);
          console.log(transactionHash);
        }
      );
    },
    submit() {
      let provider = ethers.getDefaultProvider("rinkeby");

      var wallet = new ethers.Wallet(this.tableData[0].privateKey);
      console.log("账号地址: " + wallet.address);
      var activeWallet = wallet.connect(provider);
      console.log("activeWallet: ", activeWallet);
      activeWallet.getBalance().then(function (balance) {
        console.warn(
          "余额 = ",
          ethers.utils.formatEther(balance, { commify: true })
        );
      });

      activeWallet.getTransactionCount().then(function (transactionCount) {
        console.warn("账号交易数量 = ", transactionCount);
      });

      // this.sendTransaction1(activeWallet);

      this.sendTransaction2(activeWallet);
    },
    /**
     * @Descripttion: 一步骤发送签名交易
     * @param {*}
     * @return {*}
     */
    sendTransaction2(activeWallet) {
      const txParams = {
        to: this.tableData[1].address,
        value: ethers.utils.parseEther("0")
      };
      try {
        activeWallet
          .sendTransaction(txParams)
          .then(function (tx) {
            console.log("交易结果 = ", tx);
          })
          .catch((error) => {
            console.log(22, error);
          });
      } catch (error) {
        console.log(11, error);
      }
    }
  }
};
</script>

<style></style>
