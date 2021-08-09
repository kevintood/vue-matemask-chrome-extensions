<template>
  <el-card class="box-card">
    <div class="page-transfer">
      <div class="transfer-cont">
        <el-form ref="form" label-width="100px" v-if="database.length > 0">
          <el-form-item :label="'转出'">
            <el-select
              v-model="fromInfo.account"
              :placeholder="'选择'"
              style="width: 100%"
            >
              <el-option
                v-for="item in database"
                :key="item.address"
                :label="item.address"
                :value="item.address"
              >
                <span style="float: left">{{ item.tag }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.address
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'转入'">
            <div class="trigger-contacts" @click="dialogSwitch.contacts = true">
              <i class="el-icon-tickets"></i>
            </div>
            <el-input v-model="toAccount"></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input
              v-model="amount"
              min="0"
              :max="accountInfo.eth"
              class="width-180"
            ></el-input>
            <span>czr</span>
            <el-checkbox
              v-model="checkedAll"
              @change="sendAllAmount"
              class="send-all-assets"
            >
              发送全部&nbsp;
              <span class="czr-txt-muted"
                >(&nbsp;{{ accountInfo.eth | toEthVal }}
                czr&nbsp;)
              </span>
            </el-checkbox>
          </el-form-item>
          <el-form-item :label="'备注'">
            <el-input type="textarea" v-model="extraData"></el-input>
          </el-form-item>
          <el-form-item :label="'手续费'">
            <!-- show-stops -->
            <div class="block">
              <el-slider v-model="feePercent" :max="200" :min="2"> </el-slider>
            </div>
            <span class="speculate-wrap"
              >手续费 <strong v-text="fee"></strong>czr</span
            >
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="validateForm"> 确认 </el-button>
          </el-form-item>
        </el-form>
        <div v-else>
          <i class="el-icon-circle-close-outline no-account-icon"></i>
          <p class="no-account-des">没有账户信息</p>
        </div>
      </div>

      <!-- Dialog select contacts -->
      <el-dialog
        :title="'请确认'"
        :visible.sync="dialogSwitch.contacts"
        width="70%"
      >
        <span>
          <el-select v-model="selectedContact" style="width: 100%">
            <el-option
              v-for="item in database.filter(
                (it) => it.address !== fromInfo.account
              )"
              :key="item.address"
              :label="item.tag"
              :value="item.address"
            >
              <span style="float: left">{{ item.tag }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.address
              }}</span>
            </el-option>
          </el-select>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSwitch.contacts = false"> 取消 </el-button>
          <el-button type="primary" @click="confrimContacts"> 确认 </el-button>
        </span>
      </el-dialog>

      <!-- confirm tran -->
      <template>
        <el-dialog
          title="交易信息"
          width="65%"
          :visible.sync="dialogSwitch.confrim"
        >
          <el-form ref="form" label-width="120px">
            <el-form-item :label="'转出'">
              <p>{{ fromInfo.account }}</p>
            </el-form-item>
            <el-form-item :label="'转入'">
              <p>{{ toAccount || "-" }}</p>
            </el-form-item>
            <el-form-item :label="'价格'">
              <p>{{ amount }} czr</p>
            </el-form-item>
            <el-form-item :label="'备注'">
              <p>{{ extraData || "-" }}</p>
            </el-form-item>
            <el-form-item :label="'手续费'">
              <p>{{ fee }} czr</p>
            </el-form-item>
            <el-form-item label="总价">
              <p>{{ confrimTotal }} czr</p>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSwitch.confrim = false">取消</el-button>
            <el-button type="primary" @click="dialogSwitch.passworld = true">
              确认
            </el-button>
          </div>

          <el-dialog
            width="60%"
            title="请输入密码"
            :visible.sync="dialogSwitch.passworld"
            append-to-body
          >
            <el-form ref="form" label-width="100px">
              <el-input v-model="fromInfo.passworld" type="password"></el-input>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogSwitch.passworld = false">
                取消
              </el-button>
              <el-button type="primary" @click="sendTransaction">
                确认
              </el-button>
            </div>
          </el-dialog>
        </el-dialog>
      </template>
    </div>
  </el-card>
</template>

<script>
let self = null;
const ethers = require("ethers");

export default {
  name: "Send",
  props: {
    database: Array
  },
  data() {
    return {
      dialogSwitch: {
        contacts: false,
        confrim: false,
        passworld: false
      },
      contacts: [],
      checkedAll: false,
      selectedContact: "",
      fromInfo: {
        account: "",
        passworld: ""
      },
      submitInfo: {},
      toAccount: "",
      amount: 0,
      gasPrice: "",
      feePercent: 100,
      gasLimit: 200000, //参考  myetherwallet
      extraData: ""
    };
  },
  mounted() {
    self = this;

    let provider = ethers.getDefaultProvider("rinkeby");
    console.log(provider);

    var privateKey = ethers.utils.randomBytes(32);
    var wallet = new ethers.Wallet(privateKey);
    console.warn(privateKey, "账号地址: " + wallet.address);

    //this.$db.get("czr_accounts").value();
    this.contacts = []; //this.$db.get("czr_contacts.contact_ary").value();
    if (this.database.length) {
      // this.fromInfo = {
      //   account: this.$route.query.account || this.database[0].address || "",
      //   passworld: ""
      // };
      // this.refresh();
      // this.getGasPrice();
    }
  },
  computed: {
    //Init
    fee() {
      if (this.selectedGasPrice) {
        //Transaction Fees  ＝  Gas Limit * Gas Price
        let fee = this.selectedGasPrice * this.gasLimit + "";
        return this.$web3.utils.fromWei(fee, "ether");
      } else {
        return 0;
      }
    },
    selectedGasPrice() {
      if (this.gasPrice) {
        return Math.ceil(this.gasPrice * (this.feePercent / 100));
      }
      return "";
    },
    //Init
    accountInfo() {
      if (this.fromInfo.account) {
        return this.database.find(
          (item) => item.address === this.fromInfo.account
        );
      } else {
        return {};
      }
    },
    confrimTotal: function () {
      let amountWei = this.$web3.utils.toWei(this.amount.toString(), "ether");
      let feeWei = this.$web3.utils.toWei(this.fee.toString(), "ether");
      let totalVal = Number(amountWei) + Number(feeWei);
      return this.$web3.utils.fromWei(totalVal.toString(), "ether");
    }
  },
  methods: {
    //Init data
    refresh() {
      // this.database.forEach((item) => {
      //   this.getBalance(item);
      // });
    },
    getBalance(item) {
      this.$web3.eth
        .getBalance(item.address)
        .then((data) => {
          // item.balance = _this.$web3.utils.fromWei(data, 'ether')
          item.eth = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGasPrice() {
      this.$web3.eth.getGasPrice().then((data) => {
        this.gasPrice = data;
      });
    },
    confrimContacts: function () {
      this.toAccount = this.selectedContact;
      this.dialogSwitch.contacts = false;
    },
    sendAllAmount: function () {
      if (this.checkedAll) {
        let weiVal =
          this.accountInfo.eth - this.$web3.utils.toWei(this.fee, "ether");
        let targetVal = self.$web3.utils.fromWei(weiVal.toString(10), "ether");
        this.amount = Number(targetVal) >= 0 ? targetVal : 0;
      } else {
        this.amount = 0;
      }
    },
    //confrim validate
    validateForm: function () {
      //TODO Validate
      this.dialogSwitch.confrim = true;
    },
    async sendTransaction1() {
      let provider = ethers.getDefaultProvider();

      let account = null;
      try {
        account = this.$web3.eth.accounts.decrypt(
          JSON.stringify(this.accountInfo.keystore),
          this.fromInfo.passworld
        );
      } catch (e) {
        console.log("sendDecryptWalletError", e);
        this.$message.error("解码错误");
        return;
      }

      let wallet = new ethers.Wallet(account.privateKey, provider);
      let newAddress = this.toAccount;
      // Make sure we are sweeping to an EOA, not a contract. The gas required
      // to send to a contract cannot be certain, so we may leave dust behind
      // or not set a high enough gas limit, in which case the transaction will
      // fail.
      let code = await provider.getCode(newAddress);
      if (code !== "0x") {
        throw new Error("Cannot sweep to a contract");
      }

      // Get the current balance
      let balance = await wallet.getBalance();

      // Normally we would let the Wallet populate this for us, but we
      // need to compute EXACTLY how much value to send
      let gasPrice = await provider.getGasPrice();

      // The exact cost (in gas) to send to an Externally Owned Account (EOA)
      let gasLimit = 21000;

      // The balance less exactly the txfee in wei
      let value = balance.sub(gasPrice.mul(gasLimit));

      let tx = await wallet.sendTransaction({
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        to: newAddress,
        value: value
      });

      console.log("Sent in Transaction: " + tx.hash);
    },
    //send transaction
    sendTransaction: function () {
      this.sendTransaction1();

      // this.sendTransaction2()
    },
    sendTransaction2() {
      console.log("send");
      // let self = this;
      let value = this.$web3.utils.toWei(this.amount.toString(), "ether");
      let account = null;
      try {
        account = this.$web3.eth.accounts.decrypt(
          JSON.stringify(this.accountInfo.keystore),
          this.fromInfo.passworld
        );
      } catch (e) {
        console.log("sendDecryptWalletError", e);
        this.$message.error("解码错误");
        return;
      }

      console.warn(account, this.$web3.eth.accounts);
      //Signs an Ethereum transaction with a given private key
      this.$web3.eth.accounts
        .signTransaction(
          {
            to: this.toAccount,
            value: value,
            gas: this.gasLimit, //Gas Limit
            gasPrice: this.selectedGasPrice, //Gas Price
            data: this.extraData
            //      }, this.accountInfo.privateKey)
          },
          account.privateKey
        )
        .then((hex) => {
          console.log(1212, hex);
          /*{
                messageHash: '0x6893a6ee8df79b0f5d64a180cd1ef35d030f3e296a5361cf04d02ce720d32ec5',
                r: '0x9ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9c',
                s: '0x440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
                v: '0x25',
                rawTransaction: '0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428'
            }
            */
          // return this.$web3.eth.sendSignedTransaction(hex.rawTransaction);
        })
        .then((data) => {
          console.log("222", data);
          /*
           {
              transactionHash: "0x79606c95358ff6b6f6bd585fa2801a1e2fa418753ff5bf84a00472f8a0eda96f",
              transactionIndex: 0,
              blockHash: "0x657d7609ff7abc77fcde66dc7559e8e631acd8705186c9a17dcaf2111126c761",
              blockNumber: 1,
              contractAddress : null
              cumulativeGasUsed : 21000
              gasUsed : 21000
              logs : Array(0)
              logsBloom : "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
              status : true
           }
*/
          // this.$web3.eth
          //   .getTransaction(data.transactionHash)
          //   .then((receiptData) => {
          //     this.$web3.eth.getBlock(data.blockHash).then((blockObj) => {
          //       receiptData.timestamp = blockObj.timestamp;
          //       let testFrom = self.$db
          //         .get("czr_accounts")
          //         .find({ address: account.address })
          //         .value();
          //       let testTo = self.$db
          //         .get("czr_accounts")
          //         .find({ address: self.toAccount })
          //         .value();
          //       if (testFrom) {
          //         self.$db
          //           .get("czr_accounts")
          //           .find({ address: account.address })
          //           .get("tx_list")
          //           .unshift(receiptData)
          //           .write();
          //       }
          //       if (testTo) {
          //         self.$db
          //           .get("czr_accounts")
          //           .find({ address: self.toAccount })
          //           .get("tx_list")
          //           .unshift(receiptData)
          //           .write();
          //       }
          //       this.$message.success("交易成功");
          //       //Clear data
          //       self.dialogSwitch.confrim = false;
          //       self.dialogSwitch.passworld = false;
          //       self.$router.push("/account/" + account.address);
          //     });
          //   });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("交易失败");
        });
    }
  },
  filters: {
    toEthVal: function (val) {
      console.log(val);
      if (val) {
        let tempVal = self.$web3.utils.fromWei(val.toString(), "ether");
        return tempVal; //TODO 保留4位小数
      } else {
        return 0;
      }
    }
  }
};
</script>
<style scoped>
.page-transfer {
  text-align: left;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  padding: 38px 0 20px;
}
.transfer-cont {
  padding: 0 90px;
  min-height: 450px;
}
.page-transfer .bui-form-selector {
  width: 420px;
  font-size: 14px;
}
.page-transfer .bui-form-item {
  padding-left: 220px;
}
.tran_input {
  width: 300px;
}
.select-none {
  -webkit-user-select: none;
}
.expected-assets {
  margin-top: 14px;
}
.trigger-contacts {
  width: 50px;
  height: 38px;
  background: #fff;
  position: absolute;
  right: 1px;
  top: 1px;
  z-index: 2;
  border-radius: 4px;
  cursor: pointer;
}
.trigger-contacts .el-icon-tickets {
  font-size: 24px;
  padding-left: 13px;
  padding-top: 7px;
  color: #a7aaaf;
}
.trigger-contacts:hover {
  background: #dbdbff;
}
.trigger-contacts:hover .el-icon-tickets {
  color: #5a59a0;
}
.send-all-assets {
  margin-left: 20px;
  font-size: 16px;
}
.speculate-wrap {
  color: rgb(168, 168, 168);
}
.no-account-icon {
  font-size: 100px;
  display: block;
  text-align: center;
  margin-top: 50px;
}
.no-account-des {
  text-align: center;
  margin-top: 40px;
}
</style>
