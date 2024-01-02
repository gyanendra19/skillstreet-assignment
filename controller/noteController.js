const Notes = require('../model/noteModel')
const appError = require('../utils/appError')

//RESPONSE FUNCTION
const response = (note, res, statusCode) => {
    return  res.status(statusCode).json({
        status: "success",
        data: note
    })
}

// RETRIEVING ALL NOTES
exports.allNotes = async (req, res, next) => {
    try{
        const allNotes = await Notes.find()

        if(allNotes.length === 0){
            return next(new appError('No notes availaible', 404))
        }

        response(allNotes, res, 200)
    }catch(err){
        next(err)
    }
}

// RETRIEVING ONE NOTE
exports.oneNote = async (req, res, next) => {
    try{
        const note = await Notes.findById(req.params.id)

        if(!note){
            return next(new appError('No note availaible with that ID', 404))
        }

        response(note, res, 200)
    }catch(err){
        next(err)
    }
}

// CREATING NOTE
exports.createNote = async (req, res, next) => {
    try {
        const newNote = await Notes.create(req.body)
        response(newNote, res, 201)
    } catch (err) {
        next(err)
    }
}

// UPDATING NOTE
exports.updateNote = async (req, res, next) => {
    try{
        const note = await Notes.findById(req.params.id)

        if(!note){
            return next(new appError('No note availaible with that ID', 404))
        }

        if(req.body.title) note.title = req.body.title
        if(req.body.content) note.content = req.body.content
        note.save()

        response(note, res, 200)
    }catch(err){
        next(err)
    }
}

//DELETING NOTE
exports.deleteNote = async (req, res, next) => {
    try{
       const deletedNote =  await Notes.findByIdAndDelete(req.params.id)

        if(!deletedNote){
            return next(new appError('No note availaible with that ID', 404))
        }

        res.status(204).json({
            status: 'success'
        })
    }catch(err){
        next(err)
    }
}