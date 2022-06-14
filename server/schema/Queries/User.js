const { GraphQLList, GraphQLID } = require('graphql')
const Note = require('../../models/Notes')
const { NoteType } = require('../TypeDefs/UserType')

// notes
module.exports.NOTES = {
    type: GraphQLList(NoteType),
    resolve(parent, args) {
        return Note.find()
    }
}

// note
module.exports.NOTE = {
    type: NoteType,
    args: { id: {type: GraphQLID} },
    resolve(parent, args) {
        return Note.findById(args.id)
    }
}