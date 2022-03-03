const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema 
const TeamSchema = new Schema({
    name : {
        type : String,
        required : true
    }, 
    players : {
        type : []
    }, 
});

module.exports = Team = mongoose.model('team', TeamSchema);