const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

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

module.exports = { RegisterType, LoginType, NoteType }