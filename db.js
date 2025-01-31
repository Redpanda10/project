// db.js
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/data')

db=mongoose.connection
db.on('connected',()=>{
    console.log('Connected to MongoDB')
})
db.on('error',()=>{
    console.log('Error connecting to MongoDB')
})
db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB')
})
module.exports = db;