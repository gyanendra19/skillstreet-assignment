const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    content: {
        type: String,
        required: [true, 'Please provide some content'],
        minLength: 30
    },
    createdOn: Date,
    modifiedOn: Date
})

noteSchema.pre('save', function(next){
    if(this.isNew) return next()

    this.modifiedOn = Date.now()
    next()
})

const Notes = mongoose.model('Notes', noteSchema)

module.exports = Notes