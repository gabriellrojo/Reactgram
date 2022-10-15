const User = require("../models/User")
const Photo = require("../models/Photo")
const bcrypt = require("bcryptjs")
const createToken = require("../helpers/createToken")

module.exports = class Controller {
    
    //Controller para os usuários

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
        res.status(200).json(user)
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

        const updatedUser = await User.findByIdAndUpdate({_id: user.id}, {$set: user}, {new: true})
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

    static deletePhoto = async(req, res) => {
        const id = req.params.id
        const photo = await Photo.findOne({_id: id})
        const user = req.user
        const userId = toString(user._id)
        const photoUserId = toString(photo.userId)
        if(!photo){
            res.status(404).json({erros: ["Imagem não encontrada"]})
            return
        }
        if(userId !== photoUserId){
            res.status(422).json({erros: ["A exclusão da imagem só pode ser feita por quem realizou o upload"]})
            return
        }
        try {
            await Photo.findByIdAndDelete({_id: id})
            res.status(201).json({idPhoto: id, msg: "Imagem excluida com sucesso"})
        }
        catch{
            res.status(404).json({erros: ["Ocorreu um erro. Tente novamente mais tarde"]})
        }
    }

    static getAllPhotos = async (req, res) => {
        try {
            const photos = await Photo.find().sort([["createAt", -1]]).exec()
            res.status(200).json(photos)
        } catch {
            res.status(404).json({erros: ["Ocorreu um erro. Tente novamente"]})
        }
        
    }

    static getUserPhotos = async (req, res) => {
        const id = req.params.id
        const userPhotos = await Photo.find({userId: id})
        res.status(200).json(userPhotos)
        //res.status(200).json(userPhotos).sort([["createdAt, -1"]]).exec()
        
    }

    static getPhotoById = async (req, res) => {
        const id = req.params.id

        const getPhoto = await Photo.findById({_id: id})
        if(!getPhoto){
            res.status(404).json({erros: ["Fotos não encontrada"]})
            return
        }
        
        res.status(201).json(getPhoto)
    }

    static updatePhoto = async (req, res) => {
        const id = req.params.id
        const title = req.body.title
        const photo = await Photo.findById({_id: id})
        const user = req.user
        const userId = toString(user._id)
        const photoUserId = toString(photo.userId)
        if(userId !== photoUserId){
            res.status(422).json({erros: ["Operação não permitida"]})
            return
        }

        if(title){
            photo.title = title
        }

        const updatedPhoto = await Photo.findByIdAndUpdate({_id: id}, {$set: photo}, {new: true}) // podemos atualizado também utilizando: photo.save()

        res.status(201).json({"foto atualizada com sucesso": updatedPhoto})
    }

    static likeOnPhotos = async (req, res) => {
        const user = req.user
        const userId = user._id
        const id = req.params.id

        const photo = await Photo.findOne({_id: id})

        if(!photo){
            res.status(422).json({erros: ["A foto não foi encontrada"]})
        }

        if(photo.likes.includes(userId)){
            res.status(422).json({erros: ["Você já curtiu essa foto"]})
            return
        }

        photo.likes.push(userId)

        const updatedLikes = await Photo.findByIdAndUpdate({_id: id}, {$set: photo}, {new: true})

        res.status(201).json(updatedLikes)
    }

    static commentsOnPhotos = async (req, res) => {
        const id = req.params.id
        const user = req.user
        const comment = req.body.comment
        const userId = user._id
        const name = user.name
        const image = user.image

        const objComment = {
            comment: comment,
            id: userId,
            name: name,
            image: image
            
        }

        const photo = await Photo.findById({_id: id})

        if(!photo){
            res.status(422).json({erros: ["Nenhuma foto foi encontrada"]})
            return
        }
        
        photo.comments.push(objComment)

        const updateWithComment = await Photo.findByIdAndUpdate({_id: id}, {$set: photo}, {new: true})

        res.status(201).json({"comentário adicionado com sucesso": updateWithComment})
    }

    static searchPhoto = async (req, res) => {
        const q = req.query.q
        
        const photo = await Photo.find({title: new RegExp(q, "i")})
        
        res.status(200).json(photo)
    }
}