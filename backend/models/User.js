const mongoose = require("../db/conn")
const { Schema } = mongoose

const User = mongoose.model("User", new Schema ({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    image: { type: String },
    bio: { type: String },

}, {
    timestamps: true
}))

module.exports = User