const express = require('express');
const skillRoute = express.Router();
const skillSchema = require('../schema/skillSchema');

skillRoute.get('/',(req,res)=>{
    skillSchema.find({}).then(data=>{
        res.send(data);
    })
})

skillRoute.post('/',async(req,res)=>{
    const data = new skillSchema({
        skill : req.body.skill,
        rating : req.body.rating,
        imgUrl : req.body.imgUrl
    });
    try {
        const result = data.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
    
})

module.exports = skillRoute;