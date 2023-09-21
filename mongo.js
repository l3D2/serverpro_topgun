const mongoose = require('mongoose')

const dotenv = require('dotenv')
const { Timestamp } = require('mongodb')
const env = dotenv.config().parsed

const dataSchema = new Schema({
    devicename: String,
    coords: Array,
    date: Timestamp,
    waterlevel: Double,
})

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://vatcharathon:"+ env.MONGODB_PASS +"@topgun.rudhxpv.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Mongodb has connected")
    })
    .catch(err => console.log("Error connecting to Mongodb: " + err))

function insertData(data){
    /* data.save((err, )) */
}