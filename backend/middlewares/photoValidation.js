const { body } = require("express-validator")

const photoUpload = () => {
    return [
        body("title")
            .isString()
            .withMessage("O campo da imagem é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O título deve ter no mínimo 3 caractéres"),
        body("image")
            .custom((value, { req }) => {
                if(!req.file){
                    throw new Error("O upload da imagem é obrigatório")
                }
                return true
            })
    ]
}

module.exports = { photoUpload }