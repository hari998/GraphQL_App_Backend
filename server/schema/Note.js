const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { NOTES, NOTE } = require('./Queries/User')
const { REGISTER_USER, LOGIN, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } = require('./mutations/UserMutation')


/* 
mutation{
  registerUser(name:"ra", email:"ra@ra.ra", password:"ra" ) {
    id
    name
    email
  }
}
 */


// query
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        notes: NOTES,
        note: NOTE,
    }
})

// mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: REGISTER_USER,
        login: LOGIN,
        addNote: ADD_NOTE,
        deleteNote: DELETE_NOTE,
        updateNote: UPDATE_NOTE,
    }
})

module.exports = new GraphQLSchema({
    query,
    mutation
})