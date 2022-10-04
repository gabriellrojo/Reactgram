const server = require("express")
const routePhoto = server.Router()
const { photoUpload } = require("../middlewares/photoValidation")
const auth = require("../middlewares/auth")
const { imageUpload } = require("../middlewares/uploadStorageImage")
const validation = require("../middlewares/handleValidation")
const Controllers = require("../controls/Controllers")

routePhoto.post("/", auth, imageUpload.single("image"), photoUpload(), validation, Controllers.uploadPhoto)

module.exports = routePhoto