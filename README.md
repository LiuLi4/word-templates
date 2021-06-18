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

#把项目打成jar包

用生产环境的yml文件打包

mvn clean package -P prod

参考文章：https://juejin.cn/post/6856965881378029582

#打好的jar包放到线上服务器
java -jar  运行项目

#测试项目
```

## Windows环境下常用到命令

``` bash
查找被占用的端口
netstat -ano | findstr "1080"

根据进程父ID杀死进程
taskkill /pid 5588 /f
```
