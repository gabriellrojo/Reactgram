const mongoose = require("mongoose")
const passwordDb = process.env.USER_DB
const userDb = process.env.PSS_db

const conn = async () => {
    
    try{
        const conn_db = await mongoose.connect(`mongodb+srv://${userDb}:${passwordDb}@cluster0.dxqpi8a.mongodb.net/?retryWrites=true&w=majority`)
        console.log("Estou connectado ao MongoDbAtlas via Mongoose")

    } catch(err) {
        console.log(err)
    }
}

conn()

