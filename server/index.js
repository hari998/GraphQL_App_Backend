const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()
connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == 'development'
}))

app.get('/', (req, res) => res.send('hello'))

app.listen(port, (req, res) => (console.log(`express at port: ${port}`)))