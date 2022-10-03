const mongoose = require("mongoose")
const { Schema } = mongoose

const User = mongoose.model("User", new Schema ({
    name: { type: String, required: true },
    email: { email: String, required: true },
    password: { password: String, required: true },
    image: { type: String },
    bio: { type: String, required: true },

}, {
    timestamps: true
}))

module.exports = User