const express = require('express')
const notesRoute = require('./routes/notesRoute')
const userRoute = require('./routes/userRoute')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'})


const app = express()

app.use(express.json());
// console.log(process.env.database)

const DB = process.env.database.replace('<password>', process.env.password)
mongoose.connect(DB).then(con => {
    console.log('connected')
})

app.use('/api/v1/notes', notesRoute)
app.use('/api/v1/users', userRoute)

const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

app.use(globalError)
const port = 4500
app.listen(port, () => {
    console.log('Working')
})