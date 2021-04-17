const mongoose = require('mongoose');

// schema adalah struktur
const UserSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    umur : {
        type : Number,
        required : true
    },
    phone_number : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    }
},{timestamps : true});

module.exports = mongoose.model('User', UserSchema);