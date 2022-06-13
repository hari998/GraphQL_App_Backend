const mongoose = require('mongoose')

const connectDB = () => {
    console.log(`connecting to mongo..`)
    mongoose.connect(process.env.MONGO_URI)
        .then((r) => console.log(`mongo-connected`))
        .catch((error) => handleError(error))
}

// // connect using async/await
// const connectDB = async () => {
//     console.log(`connecting to mongo..`)
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log(`mongo-connected at ${conn.connection.host}`)
// }

module.exports = connectDB