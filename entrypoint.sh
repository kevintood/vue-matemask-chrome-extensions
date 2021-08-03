#!/bin/bash
###
 # @Descripttion: 
 # @version: 
 # @Author: HFL
 # @Date: 2021-08-02 15:53:03
 # @LastEditors: HFL
 # @LastEditTime: 2021-08-02 15:54:54
### 
sed -i "s|API_BASE_URL|$API_BASE_URL|g" /usr/share/nginx/html/conf.js
# run nginx
exec /usr/sbin/nginx -g "daemon off;"
