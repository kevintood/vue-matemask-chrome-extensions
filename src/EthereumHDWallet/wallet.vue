<!--

 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-18 18:24:13

-->
<template>
  <div>
    <el-divider content-position="left">mnemonic code</el-divider>
    {{ root.mnemonic }}
    <el-divider content-position="left">seed</el-divider>
    {{ root.seed }}
    <el-divider content-position="left">Master Key</el-divider>
    {{ root.hdWallet }}
    <!-- <el-divider content-position="left">publicKey</el-divider>
    {{ root.publicKey }} -->
    <!-- <el-divider content-position="left">privateKey</el-divider>
    {{ root.privateKey }} -->
    <el-divider></el-divider>
    <el-table stripe :data="tableData" style="width: 100%">
      <el-table-column prop="keyName" label="Path" width="137">
      </el-table-column>
      <el-table-column prop="address" label="Address" width="370">
      </el-table-column>
      <el-table-column prop="publicKey" label="publicKey"> </el-table-column>
      <el-table-column prop="privateKey" label="privateKey"> </el-table-column>
    </el-table>

    <el-divider content-position="left">发起签名交易</el-divider>
    <div id="icon-address">
      <img />
    </div>
    <!-- <p style="color: red">
      注：交易将从列表中的第一个钱包({{
        tableData && tableData.length > 0 ? tableData[0].address : ""
      }})转账给第二个钱包({{
        tableData && tableData.length > 0 ? tableData[1].address : ""
      }})，确保交易成功，请使用metamask中有代币的钱包向第一个钱包转账,交易来源钱包必须有余额才能转账。设置转账的代币为0。请转账成功前不要刷新页面，避免重新生成所有钱包。
    </p> -->
    <el-button type="" @click="submit">提交</el-button>
    <el-button type="" @click="signTypedData">
      签名 signTypedData EIP-712 签名{domain}, {type}, {value}数据
    </el-button>
    <el-button type="" @click="sign_eth_sign">
      签名 eth_sign EIP-191 签名字符串"hello world"数据
    </el-button>
    <el-button type="" @click="signTransaction">
      签名 signTransaction 签名{to:"", value:""}交易数据
    </el-button>
    <el-divider content-position="left">CSPRNG</el-divider>
    <el-button type="" @click="onCSPRNG"> CSPRNG </el-button>
    {{ nanoid }} <el-tag>{{ nanoid.length }}</el-tag>

    <el-divider content-position="left">PBKDF2_HMAC_SHA512</el-divider>
    <el-button type="" @click="onPBKDF2_HMAC_SHA512">
      PBKDF2_HMAC_SHA512
    </el-button>
    <p>{{ dataXX }}</p>
    <p>
      {{ PBKDF2_HMAC_SHA512 }},{{ PBKDF2_HMAC_SHA512.length }}</p>

      <el-divider content-position="left">SHA256</el-divider>
      <el-button type="" @click="onSHA256"> SHA256 </el-button>
    </p>

    <p>{{ sha256.msg }}</p>
    <p>{{ sha256.decryptMsg }}</p>

    <el-divider content-position="left">RSA</el-divider>
    <el-button type="" @click="onRSA"> RSA </el-button>
    <p>{{ rsaMsg.encryptMsg }}</p>
    <p>{{ rsaMsg.decryptMsg }}</p>

    <el-divider content-position="left">AES-ECB</el-divider>
    <el-button type="" @click="onAesEcb"> AES-ECB </el-button>
    <p>key: {{ aesEcbMsg.key }}</p>
    <p>clear(decryptMsg): {{ aesEcbMsg.clear }}</p>
    <p>encryptMsg: {{ aesEcbMsg.encryptMsg }}</p>

    <p>decryptMsg: {{ aesEcbMsg.decryptMsg }}</p>

    <el-divider content-position="left">AES-GCM</el-divider>
    <el-button type="" @click="onAesGCM"> AES-GCM </el-button>
    <p>encryptMsg: {{ aesGCMMsg.encryptMsg }}</p>
    <p>decryptMsg: {{ aesGCMMsg.decryptMsg }}</p>
    <p>gcm_aes_vectors: {{ aesGCMMsg.gcm_aes_vectors }}</p>
  </div>
</template>
<script>
import { customAlphabet } from "nanoid";
var jazzicon = require("@metamask/jazzicon");
const Tx = require("ethereumjs-tx"); // 必须下载1.3.7版本的，其他版本可能会出现各种奇葩的问题
var bip39 = require("bip39");
import { hdkey } from "ethereumjs-wallet";
var util = require("ethereumjs-util");
import testProviders from "@/assets/json/TestProviders.json";
var wordlists = require("@/assets/json/wordlists.json");
const ethers = require("ethers");
import * as asmCrypto from "asmcrypto.js";
import jsencrypt from "jsencrypt";
// const randomBytes = require("randombytes");  // 创建助记词随机数方法
export default {
  name: "wallet",
  components: {},
  data() {
    return {
      aesGCMMsg: {
        encryptMsg: "",
        decryptMsg: "",
        gcm_aes_vectors: {}
      },
      aesEcbMsg: {
        encryptMsg: "",
        decryptMsg: "",
        key: null,
        clear: null,
        cipher: null
      },
      sha256: { msg: "", decryptMsg: "" },
      rsaMsg: { encryptMsg: "", decryptMsg: "" },
      PBKDF2_HMAC_SHA512: "",
      dataXX: {},
      transactionCount: 0,
      userInfo: {},
      visible: false,
      root: {
        seed: null,
        hdWallet: null,
        publicKey: null,
        privateKey: null,
        mnemonic: null
      },
      wordlists: wordlists,
      tableData: [],
      newList: [],
      msg: "",
      nanoid: ""
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(function () {
      _this.getWallet();
    });
    setTimeout(() => {
      document
        .getElementById("icon-address")
        .getElementsByTagName("img")[0].parentNode.innerHTML = "";
    }, 2000);
  },
  methods: {
    onAesGCM() {
      this.aesGCMMsg.gcm_aes_vectors = {
        // key
        key: "dGQhii+B7+eLLHRiOA690w==",
        // nonce
        nonce: "R8q1njARXS7urWv3",
        // adata
        adata: undefined,
        // tagSize
        tagSize: 16,
        // input message
        inputMessage: "hello world"
      };

      const key = asmCrypto.base64_to_bytes(this.aesGCMMsg.gcm_aes_vectors.key);
      const nonce = asmCrypto.base64_to_bytes(
        this.aesGCMMsg.gcm_aes_vectors.nonce
      );
      const adata = this.aesGCMMsg.gcm_aes_vectors.adata;
      const tagsize = this.aesGCMMsg.gcm_aes_vectors.tagsize;
      const cleartext = asmCrypto.string_to_bytes(
        this.aesGCMMsg.gcm_aes_vectors.inputMessage
      );

      let encryptMsg = asmCrypto.AES_GCM.encrypt(
        cleartext,
        key,
        nonce,
        adata,
        tagsize
      );
      this.aesGCMMsg.encryptMsg = asmCrypto.bytes_to_hex(encryptMsg);

      let decryptMsg = asmCrypto.AES_GCM.decrypt(
        encryptMsg,
        key,
        nonce,
        adata,
        tagsize
      );
      this.aesGCMMsg.decryptMsg = asmCrypto.bytes_to_string(decryptMsg);
    },
    onAesEcb() {
      const ecb_aes_vectors = [
        "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4", // key
        "f69f2445df4f9b17ad2b417be66c3710" // clear text
        // "23304b7a39f9f3ff067d8d8f9e24ecc7" // cipher text
      ];

      this.aesEcbMsg.key = new Uint8Array(
        asmCrypto.hex_to_bytes(ecb_aes_vectors[0])
      );
      this.aesEcbMsg.clear = new Uint8Array(
        asmCrypto.hex_to_bytes(ecb_aes_vectors[1])
      );
      // this.aesEcbMsg.cipher = new Uint8Array(
      //   asmCrypto.hex_to_bytes(ecb_aes_vectors[2])
      // );

      this.aesEcbMsg.encryptMsg = asmCrypto.AES_ECB.encrypt(
        this.aesEcbMsg.clear,
        this.aesEcbMsg.key
      );

      this.aesEcbMsg.decryptMsg = asmCrypto.AES_ECB.decrypt(
        this.aesEcbMsg.encryptMsg,
        this.aesEcbMsg.key
      );
    },
    onSHA256() {
      this.sha256.msg =
        "For this sample, this 63-byte string will be used as input data";
      let msg = asmCrypto.string_to_bytes(this.sha256.msg);
      let sha256 = new asmCrypto.Sha256();
      this.sha256.decryptMsg = asmCrypto.bytes_to_hex(
        sha256.process(msg).finish().result
      );
    },
    onRSA() {
      var encrypt = new jsencrypt();

      // encrypt.setPublicKey(
      //   "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYO23qMcvv0gpGs97rfmxITjjz5m/sjZ4JgYvPBs+JHwD/SCv7TJCEKVm4aXTEPTXRkN7LgUjQTnEGGS1JBY4zyqpnmJcfpNxWpdgAyE/4poMJ8rcZvqm14DOjNH+69mwpIdJkySHuzUCzQtMJ8GG2owNc9frTOpZozlcUWbGWfQIDAQAB"
      // );

      this.rsaMsg.encryptMsg = encrypt.encrypt("hello world");
      // encrypt.setPrivateKey(privateKey);

      this.rsaMsg.decryptMsg = encrypt.decrypt(this.rsaMsg.encryptMsg);
    },
    onPBKDF2_HMAC_SHA512() {
      this.dataXX = {
        password: asmCrypto.string_to_bytes(
          "word accident there hurry payment fancy cave basic answer fever prosper harvest"
        ),
        salt: asmCrypto.string_to_bytes("mnemonic"),
        count: 2048,
        dklen: 64
      };
      this.PBKDF2_HMAC_SHA512 = asmCrypto.bytes_to_hex(
        asmCrypto.Pbkdf2HmacSha512(
          this.dataXX.password,
          this.dataXX.salt,
          this.dataXX.count,
          this.dataXX.dklen
        )
      );
    },
    onCSPRNG() {
      let nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
      this.nanoid = nanoid();
    },
    async signTransaction() {
      let mnemonic = localStorage.getItem("wallet-mnemonic");
      var walletM = ethers.Wallet.fromMnemonic(mnemonic);

      let tx = {
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        value: "0x00"
      };

      // Signing a transaction
      let txh = await walletM.signTransaction(tx);
      console.log("txh = ", txh);
    },
    personal_sign() {
      const exampleMessage = "Example1111 `personal_sign` message";
      const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
      this.$web3.eth.personal
        .sign(
          msg,
          "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
          "test password!"
        )
        .then(console.log);
    },
    getMetaMaskAccount(address, idName) {
      // 钱包地址生成图片
      const addr = address.slice(2, 10);
      const seed = parseInt(addr, 16);

      var divObj = document.getElementById(idName);

      var el = jazzicon(28, seed);
      if (divObj && el) {
        divObj.appendChild(el);
      }
    },
    async signTypedData() {
      // 1.通过私钥创建钱包对象
      // let wallet = new ethers.Wallet(this.tableData[0].privateKey);
      // 2.通过助记词创建钱包对象
      let mnemonic = localStorage.getItem("wallet-mnemonic");
      var wallet = ethers.Wallet.fromMnemonic(mnemonic);

      const domain = {
        chainId: testProviders.chainId,
        name: "Ether Mail",
        version: "1"
      };

      // The named list of all type definitions
      const types = {
        Mail: [
          { name: "message", type: "Person" },
          { name: "number", type: "Person" }
        ],
        Person: [
          { name: "name", type: "string" },
          { name: "value", type: "string" }
        ]
      };

      // The data to sign
      const value = {
        message: {
          name: "Message",
          value: "Hi, Alice!"
        },
        number: {
          name: "A number",
          value: "1337"
        }
      };

      let signature = await wallet._signTypedData(domain, types, value);
      console.log("signature = ", signature);

      let recovered1 = ethers.utils.verifyTypedData(
        domain,
        types,
        value,
        signature
      );
      console.log("recovered1 = ", recovered1);
    },

    async sign_eth_sign() {
      // 1.通过私钥创建钱包对象
      // let wallet = new ethers.Wallet(this.tableData[0].privateKey);
      // 2.通过助记词创建钱包对象
      let mnemonic = localStorage.getItem("wallet-mnemonic");
      var wallet = ethers.Wallet.fromMnemonic(mnemonic);

      console.log(2, wallet);
      // console.log("发出地址: " + wallet.address);
      // var activeWallet = wallet.connect(provider);

      // To sign a simple string, which are used for
      // logging into a service, such as CryptoKitties,
      // pass the string in.
      // 签署一个简单的字符串，用于
      // 登录服务，例如 CryptoKitties，
      // 将字符串
      // let signature = await activeWallet.signMessage("Hello World");

      // '0xafb0af7c861dcf2fc2d0230a967654803daa38272763c329386061ed0735c9f0279fcedd9b41f0d13529c6f02bd4a025db97c6a13775dc235432cb221ddecd001c'
      // console.log("signature 字符串直接加密= ", signature);
      // 散列字符串消息
      // let msg =
      //   "你好大S空间空间阿轲啊山东济南大苏打傻大SD安师大收到安师大收到啥大事安师大收到安师大收到安师大收到";
      // let has = ethers.utils.hashMessage(msg);
      // console.log(1, msg, msg.length, has, has.length);

      // let signature1 = await activeWallet.signMessage(has);
      // console.log("signature1 = ", signature1);

      // // 散列二进制数据（也是“Hello World”，但作为字节）
      // msg = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
      // has = ethers.utils.hashMessage(msg);
      // console.log(2, msg, msg.length, has, has.length);

      // let msg = "hello world";
      // let messageBytes1 = ethers.utils.arrayify(msg);
      // // Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

      // // To sign a hash, you most often want to sign the bytes
      // let signature1 = await activeWallet.signMessage(messageBytes1);
      // console.log("signature1 = ", signature1);

      // let xx = ethers.utils.recoverAddress(messageBytes1, signature1);
      // console.log("xx = ", xx);

      // //
      // // A common case is also signing a hash, which is 32
      // // bytes. It is important to note, that to sign binary
      // // data it MUST be an Array (or TypedArray)
      // // //一个常见的情况也签名的散列，这是32个
      // //字节。重要的是要注意，要对二进制数据进行签名，
      // // 它必须是一个数组（或 TypedArray）

      // // This string is 66 characters long   这个字符串是 66 个字符长
      let message =
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

      // This array representation is 32 bytes long   这个数组表示是 32 字节长
      let messageBytes = ethers.utils.arrayify(message);
      // Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

      // To sign a hash, you most often want to sign the bytes
      let signature = await wallet.signMessage(messageBytes);
      console.log("signature 长度为66个字符的16进制数据 = ", signature);
      let recoveredAddress = ethers.utils.verifyMessage(
        messageBytes,
        signature
      );
      console.log("recovered = ", recoveredAddress);

      // -----------------------
      // Now you have the digest,
      // const recoveredPubKey = ethers.utils.recoverPublicKey(
      //   messageBytes,
      //   signature
      // );
      // console.log(recoveredPubKey);
    },

    normalize(str) {
      return (str || "").normalize("NFKD");
    },
    salt(password) {
      return "mnemonic" + (password || "");
    },
    async getWallet() {
      // 钱包账号的过程都是是离线的，即不需要依赖以太坊网络即可创建钱包账号
      // if (localStorage.getItem("wallet-mnemonic")) {
      //   this.root.mnemonic = localStorage.getItem("wallet-mnemonic");
      // } else {
      //生成标准的128位的熵，因为1byte占8位，所需要16byte。https://www.jianshu.com/p/e6a4150eb729
      // let initialEntropy = new byte[16]();
      // secureRandom.nextBytes(initialEntropy);
      // csprng 随机数
      //通过熵生成助记词

      let wordlists = this.wordlists;
      // 256 => 24个单词
      this.root.mnemonic = bip39.generateMnemonic(256, undefined, wordlists);

      localStorage.setItem("wallet-mnemonic", this.root.mnemonic);
      // }

      let seed = await bip39.mnemonicToSeed(this.root.mnemonic);

      this.root.seed = seed.toString("hex");
      console.log("seed = ", seed);

      this.root.hdWallet = hdkey.fromMasterSeed(seed);
      console.log("hdWallet = ", this.root.hdWallet);

      this.root.publicKey =
        "0x" + this.root.hdWallet._hdkey._publicKey.toString("hex");
      this.root.privateKey =
        "0x" + this.root.hdWallet._hdkey._privateKey.toString("hex");

      for (let i = 0; i <= 2; i++) {
        let item = {};
        item.keyName = "m/44'/60'/0'/0/" + i;
        item.key = this.root.hdWallet.derivePath("m/44'/60'/0'/0/" + i);
        item.publicKey = "0x" + item.key._hdkey._publicKey.toString("hex");
        item.account = item.key._hdkey.index;
        item.privateKey = "0x" + item.key._hdkey._privateKey.toString("hex");
        item._privateKey = item.key._hdkey._privateKey;

        let address = util.pubToAddress(item.key._hdkey._publicKey, true);
        item.address = util.toChecksumAddress("0x" + address.toString("hex"));

        this.tableData.push(item);
      }

      // let key = this.tableData[0].key;
      // let account = this.tableData[0].account;
      // for (let i = 0; i <= 1; i++) {
      //   console.log("--------- " + i + " ------------");
      //   let item = {};
      //   item.keyName = "m/44'/60'/" + account + "'/0/" + i;
      //   item.key = key.derivePath("m/44'/60'/0'/0/" + i);
      //   console.log("key" + i + " = ", item.key);
      //   item.publicKey = "0x" + item.key._hdkey._publicKey.toString("hex");
      //   console.log(
      //     "item.publicKey = ",
      //     item.key._hdkey._publicKey.toString("hex")
      //   );
      //   item.privateKey = "0x" + item.key._hdkey._privateKey.toString("hex");
      //   item._privateKey = item.key._hdkey._privateKey;
      //   console.log("item.publicKey = ", item.privateKey);
      //   // item.keystore = this.$web3.eth.accounts.encrypt(
      //   //   item.privateKey,
      //   //   "123456"
      //   // );
      //   // console.warn("keystore encrypt = ", item.keystore);
      //   let address = util.pubToAddress(item.key._hdkey._publicKey, true);

      //   item.address = util.toChecksumAddress("0x" + address.toString("hex"));
      //   console.log("address = ", item.address);
      //   this.newList.push(item);
      // }

      // console.log(
      //   this.tableData[0].address,
      //   " children address = ",
      //   this.newList
      // );

      // this.getMetaMaskAccount(this.tableData[0].address, "icon-address");
    },

    /**
     * @Descripttion: 三步骤发送签名交易
     * @param {*}
     * @return {*}
     */
    async sendTransaction1() {
      // 步骤1.构造交易
      var rawTx = {
        from: this.tableData[0].address,
        nonce: "0x" + this.transactionCount.toString(16), //是发出地址和接收地址的交易数量，一定要提供正确哦
        gasLimit: "0x39000",
        gasPrice: "0x3b9aca00", // customizable by user during MetaMask confirmation.
        to: this.tableData[1].address,
        value: "0x0", // ether value, usually 0
        data: "0x42842e0e000000000000000000000000d01c39da09af008883b83331e4966507333478f3000000000000000000000000fb7c8c04028250b630a7561280cd8ff1b0b0233300000000000000000000000000000000b03df8fb280f4c3985ca65f1a49da858",
        chainId: testProviders.chainId // rinkeby chain
      };

      // 步骤2.sign and send  交易签名
      var privateKey = this.tableData[0]._privateKey;
      var tx = new Tx(rawTx);
      tx.sign(privateKey);
      var serializedTx = tx.serialize();
      console.log("serializedTx = ", serializedTx.toString("hex"));

      // 步骤3.发送（广播）交易
      this.$web3.eth
        .sendSignedTransaction("0x" + serializedTx.toString("hex"))
        .on("transactionHash", function (hash) {
          console.log("Txn:" + hash);
        })
        .on("receipt", function (receipt) {
          console.log("Receipt:" + JSON.stringify(receipt));
        });
    },
    async submit() {
      // 1.密钥，提供者
      // let provider = ethers.getDefaultProvider(testProviders.textNetwork);
      // var wallet = new ethers.Wallet(this.tableData[0].privateKey, provider);
      // 2.助记词，提供者
      let provider = ethers.getDefaultProvider(testProviders.textNetwork);
      let mnemonic = localStorage.getItem("wallet-mnemonic");
      var walletM = ethers.Wallet.fromMnemonic(mnemonic);
      var wallet = walletM.connect(provider);

      console.log("发出地址: " + wallet.address);
      wallet.getBalance().then(function (balance) {
        console.warn(
          "余额 = ",
          ethers.utils.formatEther(balance, { commify: true })
        );
      });

      let transactionCount = await wallet.getTransactionCount();
      this.transactionCount = transactionCount;

      console.warn("账号交易数量 = ", transactionCount);

      // this.sendTransaction1(); //方法一

      this.sendTransaction2(wallet); // 方法二
    },
    /**
     * @Descripttion: 一步骤发送签名交易
     * @param {*}
     * @return {*}
     */
    sendTransaction2(activeWallet) {
      console.log("activeWallet = ", activeWallet);
      const txParams = {
        to: this.newList[1].address,
        value: ethers.utils.parseEther("0"),
        data: "0x42842e0e000000000000000000000000d01c39da09af008883b83331e4966507333478f3000000000000000000000000fb7c8c04028250b630a7561280cd8ff1b0b0233300000000000000000000000000000000b03df8fb280f4c3985ca65f1a49da858"
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
