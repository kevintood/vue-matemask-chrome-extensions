<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 17:06:11
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 15:27:37
-->
<template>
  <div class="contain-metamask">
    <el-row :gutter="12" class="row-header">
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
        <el-image
          style="height: 32px"
          fit="scale-down"
          class="app-header__metafox-logo--icon"
          :src="require(`@/assets/images/metamask-fox.svg`)"
        ></el-image>
        <el-image
          style="height: 32px"
          fit="scale-down"
          class="app-header__metafox-logo--horizontal"
          :src="require(`@/assets/images/metamask-logo-horizontal.svg`)"
        ></el-image>
      </el-col>
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
        <el-popover
          placement="bottom-end"
          trigger="click"
          width="320"
          style="float: right"
          v-model="isShowPopover"
          @show="showPopover"
          @hide="hidePopover"
        >
          <div class="contain-popover">
            <div class="clearfix">
              <span class="my-accounts">My Accounts</span>
              <el-button style="float: right; padding: 4px 10px">
                Lock
              </el-button>
            </div>
            <el-divider></el-divider>
            <el-table
              max-height="190"
              :data="addressList"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              :show-header="false"
            >
              <el-table-column label="日期" width="320">
                <template slot-scope="scope">
                  <el-row
                    :gutter="12"
                    @click.native.stop="onCheckAddress(scope.row)"
                  >
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                      <i :id="scope.row.address2"> </i>
                    </el-col>
                    <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                      <div style="margin-left: 10px; font-size: 18px">
                        {{ scope.row.name }}
                      </div>
                      <div style="" class="address-eth">
                        {{ scope.row.eth }} ETH
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>

            <el-table
              max-height="190"
              row-class-name="default-row"
              :data="accountAction"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column label="日期" width="320">
                <template slot-scope="scope">
                  <div class="account-action">
                    <i :class="scope.row.icon"></i>
                    <span> {{ scope.row.action }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-divider></el-divider>
            <el-table
              row-class-name="default-row"
              max-height="190"
              :data="setting"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column label="日期" width="320">
                <template slot-scope="scope">
                  <div class="account-action">
                    <i :class="scope.row.icon"></i>
                    <span> {{ scope.row.action }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span slot="reference">
            <div
              id="avatar-accounts"
              @click="isShowPopover != isShowPopover"
            ></div>
          </span>
        </el-popover>

        <el-select
          style="float: right"
          v-model="networksValue"
          size="small"
          placeholder="请选择"
        >
          <div class="select-header">
            <el-divider>Networks</el-divider>
            <span class="networks-text">
              The default network for Ether transactions is Main Net.
            </span>
          </div>

          <el-option
            v-for="item in chainsList"
            :key="item.chainId"
            :label="item.name"
            :value="item.chainId"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="row-body" v-if="!windowHash">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
            style="text-align: center; position: relative"
          >
            <el-tooltip content="Copy to clipboard" placement="bottom">
              <el-button type="text" @click="copyText(user.address2)">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-address">{{ user.address }}</div>
              </el-button>
            </el-tooltip>
            <el-button
              style="position: absolute; right: 0px; top: 10px"
              type="text"
              icon="el-icon-more"
            ></el-button>
          </div>
          <div class="text item">
            <div style="text-align: center">
              <el-image
                style="height: 32px"
                fit="scale-down"
                :src="require(`@/assets/images/ETH.svg`)"
              ></el-image>
            </div>
            <div style="text-align: center; font-size: 2rem; margin: 20px">
              {{ user.eth }} ETH
            </div>
            <div style="text-align: center">
              <el-button
                type="primary"
                icon="el-icon-download"
                circle
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-top-right"
                circle
              ></el-button>
              <el-button
                type="primary"
                disabled
                icon="el-icon-sort"
                circle
              ></el-button>
            </div>
            <div>
              <el-tabs :stretch="true" v-model="tabActive">
                <el-tab-pane label="Assets" name="1">
                  <el-table
                    row-class-name="default-row"
                    :data="addressEth"
                    style="width: 100%"
                    :show-header="false"
                  >
                    <el-table-column label="日期">
                      <template slot-scope="scope">
                        <div class="account-action">
                          <div style="float: left">
                            <el-image
                              style="height: 32px"
                              fit="scale-down"
                              :src="require(`@/assets/images/ETH.svg`)"
                            ></el-image>
                          </div>
                          <div
                            style="
                              float: left;
                              height: 32px;
                              line-height: 32px;
                              margin-left: 10px;
                            "
                          >
                            {{ scope.row.eth }} ETH
                          </div>
                          <i
                            class="el-icon-arrow-right"
                            style="
                              float: right;
                              height: 32px;
                              line-height: 32px;
                            "
                          ></i>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="text-align: center; margin: 20px">
                    <el-button @click="addToken">Add Token</el-button>
                  </div>
                  <div style="text-align: center; font-size: 16px">
                    Need help? Contact
                    <el-link
                      :underline="false"
                      type="primary"
                      href="https://metamask.zendesk.com/hc/en-us"
                      >MetaMask Support</el-link
                    >
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Activity" name="2"> Activity </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="12" class="row-body" v-if="windowHash === '#add-token'">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> add token </el-col>
    </el-row>
  </div>
</template>

<script>
import chainsList from "@/assets/json/chains.json";
import { version } from "@/api/user";
import { copyText } from "@/utils/copyText";
var jazzicon = require("@metamask/jazzicon");
export default {
  name: "MetaMask",
  data() {
    return {
      windowHash: "",
      tabActive: "1",
      addressEth: [{ eth: 0 }],
      setting: [
        { icon: "el-icon-chat-round", action: "Support" },
        { icon: "el-icon-setting", action: "Settings" }
      ],
      accountAction: [
        { icon: "el-icon-plus", action: "Create Account" },
        { icon: "el-icon-download", action: "Import Account" },
        { icon: "el-icon-connection", action: "Connect Hardware Wallet" }
      ],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      user: {
        name: "账户 2",
        eth: 0,
        address: "0x51Fc…17E4",
        address2: "0x51Fc47eBd6BC38820bED51fac62350E2B0AC17E4"
      },
      addressList: [
        {
          name: "Account 1",
          address: "0x67e0…583B",
          address2: "0x67e0E2EF7B56cC472B80112AC81849703766583B",
          eth: 0.00001
        },
        {
          name: "账户 2",
          address: "0x51Fc…17E4",
          address2: "0x51Fc47eBd6BC38820bED51fac62350E2B0AC17E4",
          eth: 0.00002
        },
        {
          name: "账户 3",
          address: "0x7111…C0fA",
          address2: "0x7111A448f8d68D223f69447Cc56b3145a5BDC0fA",
          eth: 0.00003
        },
        {
          name: "账户 4",
          address: "0xAaD2…5100",
          address2: "0xAaD2be298d0Ab902E759b239932B1cAaF21d5100",
          eth: 0.00004
        }
      ],
      versionText: "",
      activeIndex: "1",
      chainsList: chainsList,
      isShowPopover: false,
      networksValue: 1
    };
  },
  mounted() {
    let _this = this;
    // browser.runtime.sendMessage({});
    window.addEventListener(
      "popstate",
      function (e) {
        console.log(e, 111, window.location.hash);
        _this.windowHash = window.location.hash;
      },
      false
    );
    version().then((res) => {
      _this.versionText = res;
    });
    _this.getMetaMaskAccount(_this.user.address2, "avatar-accounts");

    window.onhashchange = _this.hashChangeFire(); // TODO，对应新的hash执行的操作函数
  },
  computed: {
    defaultText() {
      return browser.i18n.getMessage("extName");
    }
  },
  watch: {},
  methods: {
    addToken() {
      location.hash = "add-token";
      window.onhashchange = this.hashChangeFire();
    },
    hashChangeFire() {
      this.windowHash = window.location.hash;
    },
    tableRowClassName({ row }) {
      if (row.address2 === this.user.address2) {
        return "success-row";
      }
      return "default-row";
    },
    onCheckAddress(item) {
      // 更新账号
      this.user = item;
      this.removeChild("avatar-accounts");
      this.getMetaMaskAccount(this.user.address2, "avatar-accounts");
      this.isShowPopover = false;
    },
    showPopover() {
      // 获取所有账号的头像
      for (let index = 0; index < this.addressList.length; index++) {
        let obj = this.addressList[index].address2;
        this.getMetaMaskAccount(obj, obj);
      }
    },
    hidePopover() {
      // 删除所有账号的头像数据
      for (let index = 0; index < this.addressList.length; index++) {
        let obj = this.addressList[index].address2;
        this.removeChild(obj);
      }
    },
    /**
     * @Descripttion: 清除所有子节点，防止累加
     * @param {*} obj
     * @return {*}
     */
    removeChild(obj) {
      var div = document.getElementById(obj);
      // 获取 div 标签下的所有子节点
      var pObjs = div.childNodes;
      for (var i = pObjs.length - 1; i >= 0; i--) {
        // 一定要倒序，正序是删不干净的，可自行尝试
        div.removeChild(pObjs[i]);
      }
    },

    copyText(text) {
      copyText(text);
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
    }
  }
};
</script>

<style scoped lang="scss">
.address-eth {
  margin-left: 10px;
  font-size: 14px;
  color: #b3b0b0;
}
.my-accounts {
  font-size: 16px;
}
.account-action {
  font-size: 16px;
}
#avatar-accounts {
  cursor: pointer;
  margin-left: 1rem;
  height: 30px;
  width: 30px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-radius: 50%;
  border-width: 2px;
  border-color: #037dd6;
}
.row-header {
  padding: 1rem 0;
}
.row-body {
  ::v-deep .el-card__header {
    padding: 5px 20px;
  }
}
::v-deep .el-table .success-row {
  background: oldlace;
  cursor: pointer;
}
::v-deep .el-table .default-row {
  cursor: pointer;
}

.user-name {
  padding-bottom: 8px;
  font-size: 18px;
  color: #000;
}
.user-address {
  color: rgb(179, 176, 176);
  font-size: 12px;
}
.select-header {
  padding: 5px;
  ::v-deep .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 15px 0;
  }
}
.contain-popover {
  ::v-deep .el-divider--horizontal {
    margin: 10px 0;
  }
  ::v-deep .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0px;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    content: "";
    position: absolute;
    background-color: #ebeef500;
    z-index: 1;
  }
}
.networks-text {
  padding: 7px;
  font-size: 0.875rem;
  font-family: Euclid, Roboto, Helvetica, Arial, sans-serif;
  line-height: 140%;
  font-style: normal;
  font-weight: normal;
  min-height: 36px;
  width: 265px;
  color: #bebebe;
}
.contain-metamask {
  margin: 0 auto;
  width: 100%;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
@media screen and (min-width: 769px) {
  .contain-metamask {
    width: 62vw !important;
  }
}
@media screen and (min-width: 575px) and (max-width: 768px) {
  .contain-metamask {
    width: 80vw !important;
  }
}
@media screen and (max-width: 576px) {
  .contain-metamask {
    width: 85vw;
  }
}
@media screen and (max-width: 575px) {
  .contain-metamask {
    width: 100%;
  }
  .app-header__metafox-logo--horizontal {
    display: none;
  }
}

@media screen and (min-width: 576px) {
  .app-header__metafox-logo--icon {
    display: none;
  }
}
</style>
