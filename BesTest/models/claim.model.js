var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var claims = new Schema({
    description: String,
    topic: String,
    createdAt: Date, 
    teacher: String


});

module.exports= mongoose.model('claims',claims);