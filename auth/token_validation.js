const { verify } = require("jsonwebtoken")
module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization")
        if(token) {
            token = token.slice(7)
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err) {
                    res.status(401).json({
                        success : false,
                        statusMessage : "401 : Unauthorized",
                        message : "Invalid Token"
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(403).json({
                success : false,
                statusMessage : "403 : Forbidden",
                message : "Access Denied! Unauthorized user"
            })
        }
    }
}