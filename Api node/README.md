# Api node

# 下载 mongo

https://www.mongodb.com/try/download/community

inter 处理器请使用 macOS x64

终端 输入 pwd 得到 home 路径 /Users/liaohaihua
然后把下载好的 mongodb-macos-x86_64-6.0.25 移动到 home 路径下

然后在 home 路径执行
ls -al
如果没有.zshrc 的话 接着执行
touch .zshrc
然后再在 .zshrc 文件里面添加 export PATH=${PATH}:/Users/liaohaihua/mongodb-macos-x86_64-6.0.25/bin
回到/Users/liaohaihua
执行 source .zshrc
接着执行 mongod
在 home 路径执行 sudo mkdir -p data/db
在执行
sudo mongod --dbpath=/Users/liaohaihua/data/db

下载 mongo 的可视化工具https://www.mongodb.com/try/download/compass

# 具体教程参考https://www.youtube.com/watch?v=8gUQL2zlpvI

## 已安装依赖

- [mongodb](https://www.npmjs.com/package/mongodb) ^6.18.0
- [mongooes] https://mongoose.nodejs.cn/docs/index.html

## 安装依赖

```sh
npm install mongodb


## 对象文档模型库
npm install mongoose

```

## 目录结构

my-express-mongoose-api/
│
├── 📁 src/ # 所有源代码
│ ├── 📁 config/ # 配置相关
│ │ └── database.js # MongoDB 连接配置
│ │
│ ├── 📁 controllers/ # 控制器：处理请求，调用 service，返回响应
│ │ └── userController.js
│ │
│ ├── 📁 models/ # Mongoose 数据模型
│ │ └── User.js
│ │
│ ├── 📁 routes/ # 路由定义：API 地址与控制器对接
│ │ └── userRoutes.js
│ │
│ ├── 📁 middlewares/ # 自定义中间件（可选，如认证、错误处理等）
│ │ └── errorHandler.js
│ │
│ ├── 📁 utils/ # 工具函数（可选）
│ │ └── validators.js # 如数据校验
│ │
│ ├── 📁 app.js # Express 应用初始化（中间件、路由等）
│ │
│ └── 📁 server.js # 项目入口：启动服务
│
├── 📄 .env # 环境变量（如 PORT, MONGODB_URI）
├── 📄 .gitignore
├── 📄 package.json
└── 📄 README.md

## package.json

{
"name": "my-express-mongoose-api",
"version": "1.0.0",
"main": "src/server.js",
"scripts": {
"start": "node src/server.js",
"dev": "nodemon src/server.js"
},
"dependencies": {
"express": "^4.18.2",
"mongoose": "^7.5.0",
"dotenv": "^16.3.1"
},
"devDependencies": {
"nodemon": "^3.0.1"
}
}

请根据你的项目需求补充启动或使用说明。
