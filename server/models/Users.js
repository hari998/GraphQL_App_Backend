const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'please enter email']
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
})

module.exports = mongoose.model('User', UserSchema)