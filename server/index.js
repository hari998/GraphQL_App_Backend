const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const { graphqlHTTP } = require('express-graphql')
const Note = require('./schema/Note')

const app = express()
connectDB()

app.use('/graphql', graphqlHTTP({
    schema: Note,
    graphiql: process.env.NODE_ENV == 'development'
}))

app.get('/', (req, res) => res.send('hello'))

app.listen(port, (req, res) => (console.log(`express at port: ${port}`)))