const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    imgUrl :{
        type : String,
        required : true
    }
});

module.exports = mongoose.model('skills',skillSchema);