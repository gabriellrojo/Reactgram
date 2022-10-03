const User = require("../models/User")
const bcrypt = require("bcryptjs")
const createToken = require("../helpers/createToken")

module.exports = class Controller {
    static home = (req, res) => {
        res.send("Hello Word")
    }

    static registerUser = async (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({erros: ["E-mail já cadastrado"]})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        }) 
        
        if(!createUser){
            res.status(422).json({erros: ["Houve um erro. Tente novamente mais tarde"]})
            return
        }

        const newUser = await createUser.save()
        const genToken = createToken(newUser._id)

        res.status(201).json({
            user: newUser,
            token: genToken
        })
    }
    static userLogin = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        const userExist = await User.findOne({email: email})

        if(!userExist){
            res.status(422).json({erros: ["Usuário não cadastrado"]})
            return
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password)
        console.log(passwordMatch)

        if(!passwordMatch){
            res.status(422).json({erros: ["Senha incorreta. Tente novamente"]})
            return
        }

        const token = createToken(userExist._id)
        res.status(201).json({
            user: userExist,
            token: token
        })

    }

    static profile = (req, res) => {
        const user = req.user
        res.send(user)
    }
}