const server = require("express")
const routePhoto = server.Router()
const { photoUpload, updatePhotoValidation, commentValidation } = require("../middlewares/photoValidation")
const auth = require("../middlewares/auth")
const { imageUpload } = require("../middlewares/uploadStorageImage")
const validation = require("../middlewares/handleValidation")
const Controllers = require("../controls/Controllers")

routePhoto.post("/upload", auth, imageUpload.single("image"), photoUpload(), validation, Controllers.uploadPhoto)
routePhoto.get("/search", auth, Controllers.searchPhoto)
routePhoto.delete("/delete/:id", auth, Controllers.deletePhoto)
routePhoto.get("/", Controllers.getAllPhotos)
routePhoto.get("/user/:id", Controllers.getUserPhotos)
routePhoto.get("/:id", Controllers.getPhotoById)
routePhoto.put("/update/:id", auth, updatePhotoValidation(), validation, Controllers.updatePhoto)
routePhoto.put("/likes/:id", auth, Controllers.likeOnPhotos)
routePhoto.put("/comments/:id", auth, commentValidation(), validation, Controllers.commentsOnPhotos)


module.exports = routePhoto