const jwt = require("jsonwebtoken")
const User = require("../models/User")
const secret = process.env.JWT_SECRET

const auth = async (req, res, next) => {
    const bearerToken = req.headers["authorization"]
    const token = bearerToken && bearerToken.split(" ")[1]
    if(!token){
        res.status(401).json({erros: ["Acesso negado"]})
    }
    try{
        const verify = jwt.verify(token, secret)
        req.user = await User.findById({_id: verify.id}).select("-password")
        next()
    }
    catch{
        res.status(401).json({erros: ["Token inválido"]})
    }

}

module.exports = auth