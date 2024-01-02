const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        lowerCase: true,
        validate: [validator.isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please enter your confirmPassword'],
        minLength: 8,
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: 'Password are not the same'
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User