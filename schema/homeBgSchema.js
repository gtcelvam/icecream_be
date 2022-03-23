const mongoose = require('mongoose');


const homeBgSchema = mongoose.Schema({
    name : {type : String,require:true },
    imgUrl : {type : String,require:true },
    active : {type : Boolean,require:true }
})

module.exports = mongoose.model('homeImg',homeBgSchema);