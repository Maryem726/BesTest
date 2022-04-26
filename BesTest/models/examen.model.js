var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var examen = new Schema({
    title: String,
    description: String,
    subject: String,
    price: Number,
    level: String,
    type: String,
    createdAt: Date,
    modifiedAt: Date,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "teachers",
    }

});

module.exports = mongoose.model('examen', examen);