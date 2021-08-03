/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-02 16:13:20
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-02 16:54:50
 */
import axios from "axios";
import APIBASEURL from "APIBASEURL";

// create an axios instance

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: `${APIBASEURL}`,
  timeout: 50000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    return config;
  },
  (error) => {
    // do something with request error
    // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.  404找不到文件，中间错误码
    if (response.status != 200) {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.error(error);

    return Promise.reject(error);
  }
);

export default service;
