import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var parent = new parent({
    id:String,
    lastname: String,
    firstname: String,
    password: String,
    matricule: String,
    email: String,
    createdAt: Date,
    address: String,
    rib: Number
});


module.exports= mongoose.model('parents',parent);