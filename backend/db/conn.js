const mongoose = require("mongoose")
require("dotenv").config()
const mongoLink = process.env.MONGO_LINK

mongoose.connect(mongoLink)
    .then(() => console.log("Estou connectado ao MongoDB Atlas via Mongoose"))
    .catch((err) => console.log(`Ocorreu um erro: ${err}`))

module.exports = mongoose


       

