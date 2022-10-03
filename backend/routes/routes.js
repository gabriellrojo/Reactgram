const express = require("express")
const route = express.Router()
const Controllers = require("../controls/Controllers")
const validation = require("../middlewares/handleValidation")
const { createUserValidation, loginUserValidation} = require("../middlewares/userValidation")
const auth = require("../middlewares/auth")

route.get("/", Controllers.home)
route.post("/user/register", createUserValidation(), validation, Controllers.registerUser)
route.post("/user/login", loginUserValidation(), validation, Controllers.userLogin)
route.get("/profile", auth, Controllers.profile)


module.exports = route