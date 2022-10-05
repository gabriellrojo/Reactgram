const express = require("express")
const routeUser = express.Router()
const Controllers = require("../controls/Controllers")
const validation = require("../middlewares/handleValidation")
const { createUserValidation, loginUserValidation, userUpdate } = require("../middlewares/userValidation")
const auth = require("../middlewares/auth")
const { imageUpload } = require("../middlewares/uploadStorageImage")
const { Router } = require("express")

routeUser.post("/register", createUserValidation(), validation, Controllers.registerUser)
routeUser.post("/login", loginUserValidation(), validation, Controllers.userLogin)
routeUser.get("/profile", auth, Controllers.profile)
routeUser.put("/update", auth, userUpdate(), validation, imageUpload.single("image"), Controllers.updateProfile)//deve ser a key que estabelecemos ao construír nosso model user.
routeUser.get("/:id", Controllers.getUserById)

module.exports = routeUser