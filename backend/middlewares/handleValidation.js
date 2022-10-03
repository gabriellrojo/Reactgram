const { validationResult } = require("express-validator")

const validation = (req, res, next) => {
    const erros = validationResult(req)

    if(erros.isEmpty()){
        return next()
    }
    else {
        const errosObtidos = []
        erros.array().map((err) => errosObtidos.push(err.msg))
        return res.status(422).json({
            erro: errosObtidos
        })
    }

}

module.exports = validation

