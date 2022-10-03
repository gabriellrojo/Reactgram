const { body } = require("express-validator")

const userValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O campo nome é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caractéres"),
        body("email")
            .isString()
            .withMessage("O campo nome é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password")
            .isString()
            .withMessage("O campo senha é obrigatório")
            .isLength({ min: 5 })
            .withMessage("A senha precisa ter no mínimo 5 caractéres"),
        body("confirmPassword")
            .isString()
            .withMessage("O campo para confirmar a senha é obrigatório")
            .custom((value, { req }) => { //o value é o valor adicionado para confirmar a senha
                if(value != req.body.password){
                    throw new Error ("As senhas devem ser iguais")
                }
                return true //para o caso de as senhas serem iguais
            })
        ]
}

module.exports = userValidation