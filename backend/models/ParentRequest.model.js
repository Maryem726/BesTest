var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var parentRequest = new Schema({
    lastname: String,
    firstname: String,
    password: String,
    matricule: String,
    email: String,
    createdAt: Date,
    address: String,
    rib: Number
});


module.exports= mongoose.model('parentRequest',parentRequest);