import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var admin = new Schema({
    id:String,
    password: String,
    matricule: String,
    email: String,
    createdAt: Date
});


module.exports= mongoose.model('admins',admin);