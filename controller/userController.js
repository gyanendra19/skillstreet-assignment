const User = require('../model/userModel')

// RESPONSE FUNCTION
const response = (note, res, statusCode) => {
    return res.status(statusCode).json({
        status: "sucess",
        data: note
    })
}

// CREATING USER
exports.createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        response(newUser, res, 201)
    } catch (err) {
        next(err)
    }
}

// RETRIEVING USERS
exports.allUsers = async (req, res, next) => {
    try{
        const allUsers = await User.find()
        response(allUsers, res, 200)
    }catch (err) {
        next(err)
    }
}