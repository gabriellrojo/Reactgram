

const { body } = require("express-validator")

const photoUpload = () => {
    return [
      body("title")
          .isString()
          .withMessage("O campo do título é obrigatório")
          .isLength({ min: 3 })
          .withMessage("O título deve ter no mínimo 3 caractéres"),
      body("image")
          .custom((value, { req }) => {
              if(!req.file){
                  throw new Error("O upload da imagem é obrigatório")
              }
              return true
          }),
    ]
}

const updatePhotoValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O campo do título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O título deve ter no mínimo 3 caractéres")
  ]
}

const commentValidation = () => {
  return [
    body("comment")
      .isString()
      .withMessage("O comentário é obrigatório")
  ]
}

module.exports = { 
  photoUpload,
  updatePhotoValidation,
  commentValidation
}