const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema 
const TeamSchema = new Schema({
    name : {
        type : String,
        required : true
    }, 
    players : {
        type : [], 
        required : true
    }, 
    avgsr : {
        type : String, 
        required : true
    }, 
    comp : {
        type : [], 
        required : true
    },  
    lfcomp : {
        type : [], 
        required : true
    }
});

module.exports = Team = mongoose.model('team', TeamSchema);