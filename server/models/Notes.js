const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    noteTitle : {
        type: String,
        required: [true, 'please add note title']

    },
    noteDescription: {
        type: String,
        required: [true, 'please add note description']
    }
})

module.exports = mongoose.model('Note', NoteSchema)