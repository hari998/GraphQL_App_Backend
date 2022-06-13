const Note = require('../models/Notes')
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

// Note type
const NoteType = new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
        id: { type: GraphQLID },
        noteTitle: { type: GraphQLString },
        noteDescription: { type: GraphQLString }
    })
})

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        notes: {
            type: new GraphQLList(NoteType),
            resolve(parent, args) {
                return Note.find()
            }
        },
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add note
        addNote: {
            type: NoteType,
            args: {
                noteTitle: { type: GraphQLNonNull(GraphQLString) },
                noteDescription: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const note = new Note({
                    noteTitle: args.noteTitle,
                    noteDescription: args.noteDescription
                })
                return note.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query,
    mutation
})