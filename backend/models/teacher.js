import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var teacher = new Schema({
    id:String,
    lastname: String,
    firstname: String,
    password: String,
    matricule: String,
    email: String,
    createdAt: Date,
    address: String,
    speciality: String,
    birthday: String,
    rib: Number
});


module.exports= mongoose.model('teachers',teacher);