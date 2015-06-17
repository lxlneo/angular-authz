#clubWeb
###运行方式
   - 安装nodejs 和npm
   - 安装grunt `npm install -g grunt` `npm install -g grunt-cli`
   - 在gurntfile.js 目录下 运行 `npm install`  等依赖安装完成后 运行 `grunt server` 就可以在127.0.0.1:9001端口可以访问到页面了

###结构说明
   - 项目根据业务划分多个模块 现在分为
      - config    系统配置
      - basic     场馆基础信息
      - business  营业前台
      - member    会员管理
      - ticket    票务管理
      - report    报表

   - url 设定
     config
11