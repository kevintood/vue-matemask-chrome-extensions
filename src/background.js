/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 11:39:56
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-03 14:27:43
 */
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.warn(1);
  request();
  sender();
  sendResponse();
});
