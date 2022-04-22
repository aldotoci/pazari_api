const mongoose = require('mongoose')

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstname: String,
        lastname: String,
        username: {
            type: String,
            unique: true
        },
        phone: {
            type: String,
            unique: true
        },
        prefix: String,
        email:{
            type: String,
            unique: true
        },
        password: String,
        dateCreated: Date
    })
)

module.exports = User