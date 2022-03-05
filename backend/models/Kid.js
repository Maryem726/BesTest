import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var kid = new kid({
    id:String,
    lastname: String,
    firstname: String,
    password: String,
    matricule: String,
    email: String,
    createdAt: Date,
    address: String,
    score: Number,
    birthday: String,
    level: String
});


module.exports= mongoose.model('kids',kid);