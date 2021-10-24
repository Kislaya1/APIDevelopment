const { verify } = require("jsonwebtoken")
module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization")
        if(token) {
            /* 
            #swagger.responses[401] = { 
               schema: { $ref: "#/definitions/UnauthorizationStdAdmin" }
            } 
            */ 
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
        } 
        /* 
            #swagger.responses[403] = { 
               schema: { $ref: "#/definitions/AccessDeniedStdAdmin" }
            } 
        */
        else {
            res.status(403).json({
                success : false,
                statusMessage : "403 : Forbidden",
                message : "Access Denied! Unauthorized user"
            })
        }
    }
}