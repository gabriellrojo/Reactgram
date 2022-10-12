//middleware para o armagenamento e upload de imagens no nosso sistema utilizando o multer.
const multer = require("multer")
const path = require("path")

//armazenamento
const imageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        let folder = ""

        if(req.baseUrl.includes("user")){
            folder = "users"
        } else if (req.baseUrl.includes("photo")){
            folder = "photos"
        }

        callback(null, `uploads/${folder}/`)
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

//upload

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(png|jpeg)$/)) {
            return callback(new Error ("A imagem deve ter extensão .png ou .jpeg, apenas."))
        }

        callback(undefined, true)
    }
})

module.exports = { imageUpload }