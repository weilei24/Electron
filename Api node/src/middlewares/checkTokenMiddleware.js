let checkTokenMiddleware = (req, res, next) => {
    console.log("req", req)
    let token = req.get("token")
    if (!token) {
        return res.json({
            code: '2003',
            token: "require token",
            data: null
        })
    }

    jwt.verify(token, "userinfo", (err, data) => {
        if (err) {
            return res.json({
                code: "2004",
                msg: "token verify failed",
                data: null
            })
        }
        next()
    })
}

module.exports = checkTokenMiddleware