<!--
 * @Descripttion: 
 * @version: 
 * @Author: HFL
 * @Date: 2021-08-03 14:55:40
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-04 18:16:34
-->
# vue-matemask-chrome-extensions
vue技术创建chrome浏览器扩展程序-模仿钱包metamask


1. 先安装node, npm
1. 安装vue cli

```
npm install -g @vue/cli
npm install -g @vue/cli-init
```

3. 根据vue-web-extension插件创建项目

```
$ vue create --preset kocal/vue-web-extension vue-matemask-chrome-extensions
$ cd vue-matemask-chrome-extensions
$ npm run build
```
4. 打包生成disk文件夹，在浏览器打开扩展程序，选择"加载已解压的扩展程序"，选择dist。自定义的扩展程序就添加到浏览器中了。


