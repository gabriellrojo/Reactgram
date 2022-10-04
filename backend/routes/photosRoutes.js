const server = require("express")
const routePhoto = server.Router()
const { photoUpload, updatePhotoValidation } = require("../middlewares/photoValidation")
const auth = require("../middlewares/auth")
const { imageUpload } = require("../middlewares/uploadStorageImage")
const validation = require("../middlewares/handleValidation")
const Controllers = require("../controls/Controllers")

routePhoto.post("/upload", auth, imageUpload.single("image"), photoUpload(), validation, Controllers.uploadPhoto)
routePhoto.delete("/delete/:id", auth, Controllers.deletePhoto)
routePhoto.get("/", Controllers.getAllPhotos)
routePhoto.get("/user/:id", Controllers.getUserPhotos)
routePhoto.get("/:id", Controllers.getPhotoById)
routePhoto.put("/update/:id", auth, updatePhotoValidation(), validation, Controllers.updatePhoto)

module.exports = routePhoto