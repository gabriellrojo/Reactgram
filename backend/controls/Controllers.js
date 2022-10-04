const User = require("../models/User")
const Photo = require("../models/Photo")
const bcrypt = require("bcryptjs")
const createToken = require("../helpers/createToken")

module.exports = class Controller {
    
    //Controller para os usuários
    
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

    static updateProfile = async (req, res) => {
        const name = req.body.name
        const password = req.body.password
        const bio = req.body.bio
        let image = null

        if(req.file){
           image = req.file.filename
        }

        const user = req.user
        
        if(name){
            user.name = name
        }
        if(password){
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
        }

        if(image){
            user.image = image
        }

        if(bio){
            user.bio = bio
        }

        const updatedUser = await User.findByIdAndUpdate({_id: user.id})
        res.status(201).json(updatedUser)
    }

    static getUserById = async (req, res) => {
        const id = req.params.id

        const user = await User.findById({_id: id})

        if(!user){
            res.status(404).json({erros: ["Usuário não encontrado"]})
            return
        }

        res.status(200).json(user)
    }

    //Controller para as imagens

    static uploadPhoto = async (req, res) => {
        const title = req.body.title
        const image = req.file.filename
        console.log(image)

        const user = req.user

        const newPhoto = new Photo({
            image: image,
            title: title,
            userId: user._id,
            userName: user.name
        })

        const uploadNewPhoto = await newPhoto.save()

        if(!uploadNewPhoto){
            res.status(422).json({erros: ["Ocorreu um problema ao realizar o upload do arquivo"]})
            return
        }

        res.status(201).json(uploadNewPhoto)
    }
}