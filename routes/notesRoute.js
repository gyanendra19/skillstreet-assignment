const express = require('express')
const noteController = require('../controller/noteController')
const authController = require('../controller/authController')
const router = express.Router()

//PROTECT MIDDLEWARE
router.use(authController.protect)

//CRUD ENDPOINTS
router.route('/').post(noteController.createNote).get(noteController.allNotes)
router.route('/:id').get(noteController.oneNote).patch(noteController.updateNote).delete(noteController.deleteNote)
module.exports = router