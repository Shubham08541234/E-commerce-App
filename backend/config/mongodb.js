import mongoose from 'mongoose'

const mongoDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB Connected: ")
    })

    mongoose.connection.on('error', (err) => {
        console.log("DB connection error: ", err);
    })
    await mongoose.connect(`${process.env.mongoDB_URI}/e-commerce`);
}

export default mongoDB
