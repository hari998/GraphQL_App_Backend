const Note = require('../models/Notes')
const User = require('../models/Users')
const asyncHandler = require('express-async-handler')

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

// register type
const RegisterType = new GraphQLObjectType({
    name: 'Register',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

// login type
const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

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
            type: GraphQLList(NoteType),
            resolve(parent, args) {
                return Note.find()
            }
        },
        note: {
            type: NoteType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Note.findById(args.id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // register
        registerUser: {
            type: RegisterType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const registeruser = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password
                })
                return registeruser.save()
            }
        },
        // login
        login: {
            type: LoginType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const bc = args.email
                console.log('bc- ', bc)
                console.log('pswrd- ', args.password)
                const loginuser = asyncHandler(async () => {
                    try {
                    const user = await User.find({bc})
                    console.log('user- ', user)
                    if(user && args.password) {
                        return console.log('heloo')
                    } else {console.log('bye')}
                    } catch (error) {
                        console.log(error)
                    }
                })
                console.log('log- ', loginuser())
            }
        },
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
        // delete note
        deleteNote: {
            type: NoteType,
            args: { 
                id: {type: GraphQLNonNull(GraphQLID)}
             },
             resolve(parent, args) {
                return Note.findByIdAndRemove(args.id)
             }
        },
        // update note
        updateNote: {
            type: NoteType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                noteTitle: { type: GraphQLNonNull(GraphQLString) },
                noteDescription: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
         // //(** passing this , gives error so pass the values directlty in findbyidandupdate)
                // const noteUpdated = new Note({
                //     noteTitle: args.noteTitle,
                //     noteDescription: args.noteDescription
                // })
                return Note.findByIdAndUpdate(args.id, {noteTitle: args.noteTitle, noteDescription: args.noteDescription}, {new: true})
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query,
    mutation
})