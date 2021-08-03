/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-03-17 11:34:53
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-02 16:18:16
 */
import request from "@/utils/request";

export function version() {
  return request({
    url: `/version`,
    method: "get"
  });
}
