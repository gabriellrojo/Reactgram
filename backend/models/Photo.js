const mongoose = require("../db/conn")
const { Schema } = mongoose

const Photo = mongoose.model("Photo", new Schema({
    image: { type: String },
    title: { type: String },
    likes: { type: Array },
    comments: { type: Array },
    userId: mongoose.ObjectId,
    userName: { type: String }
}, {
    timestamps: true
}))

module.exports = Photo