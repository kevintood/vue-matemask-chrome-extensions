/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-03 18:43:58
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-06 17:46:17
 */
/**
 * @name: 16进制转化为10进制整数
 * @test: test font
 * @msg:
 * @param {*} hex  16进制字符串
 * @return {*}
 */
export function hex2int(hex) {
  var len = hex.length,
    a = new Array(len),
    code;
  for (var i = 0; i < len; i++) {
    code = hex.charCodeAt(i);
    if (48 <= code && code < 58) {
      code -= 48;
    } else {
      code = (code & 0xdf) - 65 + 10;
    }
    a[i] = code;
  }

  return a.reduce(function (acc, c) {
    acc = 16 * acc + c;
    return acc;
  }, 0);
}
/**
 * @Descripttion: 格式话钱包地址
 * @param {*} address
 * @return {*}
 */
export function formarAddress(address) {
  if (!address) return "";
  return address.substr(0, 6) + "…" + address.substr(address.length - 4);
}
