const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema 
const PlayerSchema = new Schema({
    battleTag : {
        type : String,
        required : true
    },
    teamid : {
        type : String,
        required : false
    },
    platform : {
        type : String,
        default : "pc"
    },
    region : {
        type : String, 
        default : "us"
    }, 
    avgsr : {
        type : String, 
        required : false
    },
    tanksr : {
        type : String, 
        required : false
    }, 
    dmgsr : {
        type : String, 
        required : false
    }, 
    suppsr : {
        type : String, 
        required : false
    },
    topHeros : {
        type : String, 
        required : false
    }, 
});

module.exports = Player = mongoose.model('player', PlayerSchema);