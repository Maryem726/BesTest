var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teacher = new Schema({
    lastname: String,
    firstname: String,
    password: String,
    matricule: String,
    email: String,
    createdAt: Date,
    address: String,
    speciality: String,
    birthday: Date,
    rib: Number
});


module.exports= mongoose.model('teachers',teacher);