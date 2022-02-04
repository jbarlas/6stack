const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema 
const PlayerSchema = new Schema({
    battletag : {
        type : String,
        required : true
    },
    teamid : {
        type : String,
        required : true
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
        required : true
    },
    tanksr : {
        type : String, 
        required : true
    }, 
    dmgsr : {
        type : String, 
        required : true
    }, 
    suppsr : {
        type : String, 
        required : true
    },
    topHeros : {
        type : [], 
        required : true
    }, 
});

module.exports = Player = mongoose.model('player', PlayerSchema);