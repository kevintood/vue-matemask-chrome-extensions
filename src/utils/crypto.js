/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-13 10:24:12
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-13 10:31:12
 */
/**
 * 工具类
 */
// import Vue from "vue";
import CryptoJS from "crypto-js";
export default {
  /**
   * @Descripttion: 加密
   * @param {*} word  待加密字符串; string; 如果想对一个js对象加密，需要先把该对象转成json字符串。
   * @param {*} keyStr 是aes加密需要用到的16位字符串的key
   * @return {*}
   */
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : "abcdefgabcdefg12";
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  /**
   * @Descripttion: 解密  string
   * @param {*} word 待加解密字符串
   * @param {*} keyStr 是aes加密需要用到的16位字符串的key
   * @return {*}
   */
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : "abcdefgabcdefg12";
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
};
