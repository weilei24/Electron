//token 是客户端生成的返回给HTTP客户端的一串加密字符,token中保存着用户信息
//token 作用是会话控制,可以识别用户身份,主要用于移动端app
//token工作流程,天蝎账号密码校验身份,校验通过后响应token,token一般是在响应体中返回给客户端
//token是手动添加在请求报文中,cookie 是自动添加的
// 用token 服务端压力小
// 相对安全 数据加密
// 扩展性强 服务简可以共享,方便增加服务节点

//JWT使token 校验变得规范


const jwt = require('jsonwebtoken')


//参数是 需要加密的数据体, 加密的key 和加密配置
let token = jwt.sign({ username: 'zhangsan' }, 'fistToken', {
    expiresIn: 60
})


//验证 token

const t = "xxxxxxx"
token.verify(t, "firstToken", (err, date) => {
    if (err) {
        console.log('faild token validation')
    }
    console.log(data)
})