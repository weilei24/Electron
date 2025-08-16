const jwt = require("jsonwebtoken");

const userInfoModel = require("../models/userInfoModel");
const md5 = require("md5");

const { customAlphabet } = require("nanoid");

//登陆模块
const getUserByCredentials = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.apiError("phone and password can not be empty", 400);
  }
  try {
    const hashedPassword = md5(password);
    const user = await userInfoModel.findOne({
      phone: phone,
      password: hashedPassword,
    });
    if (!user) {
      return res.apiError("Invalid phone or password", 400);
    }

    // 设置 session 数据 注意这里是异步的 需要等待保存完成再返回用户信息
    req.session.userId = user._id;
    req.session.phone = user.phone;
    req.session.isLoggedIn = true;

    //设置session 后 等待一小段时间确保保存完成
    setTimeout(() => {
      console.log("Session data set:", req.session);
    }, 100);
    //创建当前用户token
    let token = jwt.sign({ phone: user.phone, _id: user._id }, "userInfo", {
      expiresIn: 60 * 60 * 24 * 7, //一周过期
    });

    //返回用户信息
    res.apiSuccess({ ...user._doc, token });
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//注册模块
const createUser = async (req, res) => {
  if (!req.body.nickName || !req.body.phone || !req.body.password) {
    return res.apiError("phone and password can not be empty", 400);
  }
  try {
    const numbers = "0123456789";
    // 2. 创建一个生成 7 位数字的 nanoid（自定义字母表 + 长度）
    const generate7DigitNumber = customAlphabet(numbers, 7);
    const newUser = await userInfoModel.create({
      userId: `U${generate7DigitNumber()}`, // 使用 nanoid 生成唯一用户ID
      nickName: req.body.nickName,
      phone: req.body.phone,
      password: md5(req.body.password), // 使用 md5 加密密码
    });
    res.apiSuccess(newUser);
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
};
//退出
const userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.apiError("Failed to logout", 500);
      return;
    }
    console.log("Session destroyed:", req.session);
    res.apiSuccess();
  });
};

module.exports = {
  getUserByCredentials,
  createUser,
  userLogout,
};
