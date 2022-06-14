const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')
const Note = require('../../models/Notes')
const User = require('../../models/Users')
const asyncHandler = require('express-async-handler')
const {  RegisterType, LoginType, NoteType } = require('../TypeDefs/UserType')

// Register user
module.exports.REGISTER_USER = {
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
}

// login user
module.exports.LOGIN = {
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
}


module.exports.ADD_NOTE = {
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
}


module.exports.DELETE_NOTE = {
    type: NoteType,
    args: { 
        id: {type: GraphQLNonNull(GraphQLID)}
     },
     resolve(parent, args) {
        return Note.findByIdAndRemove(args.id)
     }
}


module.exports.UPDATE_NOTE = {
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
}



