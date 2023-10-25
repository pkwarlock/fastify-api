const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false })
// module.exports =  mongoose.model('Admin', AdminSchema)
module.exports =  mongoose.model('User',  UserSchema)