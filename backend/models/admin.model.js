var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var admin = new Schema({
    id:String,
    matricule:String
   
});

module.exports= mongoose.model('admin',admin);