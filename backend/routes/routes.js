const express = require("express")
const route = express.Router()
const Controllers = require("../controls/Controllers")
const validation = require("../middlewares/handleValidation")
const userValidation = require("../middlewares/userValidation")

route.get("/", Controllers.home)
route.post("/user/register", userValidation(), validation, Controllers.registerUser)

module.exports = route