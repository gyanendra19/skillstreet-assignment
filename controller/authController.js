const User = require('../model/userModel')
const appError = require('../utils/appError')
const jwt = require('jsonwebtoken')


//LOGGING THE USER
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email, password: password })

        if (!user) {
            return next(new appError('Incorrect email or password', 404))
        }

        const id = user._id
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY
        })

        res.status(200).json({
            status: 'success',
            token,
            data: user
        })
    } catch (err) {
        next(err)
    }
}

// PROTECTING THE ENDPOINTS
exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return next(new appError('You are not logged in', 403))
        }

        next()
    } catch (err) {
        next(err)
    }
}