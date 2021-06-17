# word-templates

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Vim项目打包到SpringBoot项目下

``` bash
# 把VUE的IP配置改成线上环境
Global.vue和Wordload.vue文件下的url属性

# 打包VUE项目
npm run build
打包后的文件在dist文件夹下

用生成的index.html和static文件夹替换springboot项目resource/templates下的对应文件
修改成线上配置
url: jdbc:mysql://localhost:3306/wordlates?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
#把项目打成jar包

#打好的jar包放到线上服务器
java -jar  运行项目

#测试项目
