const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

const tokenGenerate = (id) => {
    const token = jwt.sign({id}, secret, {
        expiresIn: "7d"
    })
    return token
}

module.exports = tokenGenerate