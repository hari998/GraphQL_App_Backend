const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    noteTitle : {
        type: String,
    },
    noteDescription: {
        type: String,
    }
})

module.exports = mongoose.model('Note', NoteSchema)