const express = require('express');
const skillRoute = express.Router();
const skillSchema = require('../schema/skillSchema');

skillRoute.get('/',(req,res)=>{
    skillSchema.find({}).then(data=>{
        res.send(data);
    })
})

skillRoute.get('/:id',(req,res)=>{
    let id = req.params.id;
    skillSchema.findById({_id:id},(err,data)=>{
        if(err) res.status(404).json({status:false,message:err})
        data ? res.status(200).json(data) : res.status(404).json({status:false,message:"No Data Found!"});
    });
})

skillRoute.post('/',async(req,res)=>{
    const data = new skillSchema({
        skill : req.body.skill,
        rating : req.body.rating,
        imgUrl : req.body.imgUrl
    });
    try {
        const result = await data.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
    
})

skillRoute.post('/all',(req,res)=>{
    skillSchema.insertMany(skillData).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(404).json(err);
    })
});

skillRoute.patch('/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    skillSchema.findByIdAndUpdate({_id :id},data,{new: true,upsert:true},(err,data)=>{
        if(err) res.status(404).json({status:false,message:err})
        data ? res.status(200).json(data) : res.status(404).json({status:false,message:"No Data Found!"});
    })
});

skillRoute.delete('/:id',(req,res)=>{
    const id = req.params.id
    skillSchema.findByIdAndRemove({_id : id},(err,data)=>{
        if(err) res.status(404).json({status:false,message:err})
        data ? res.status(200).json({status:true,message:"Data Deleted Successfully!"}) : res.status(404).json({status:false,message:"No Data Found!"});
    });
})

skillRoute.delete('/all',(req,res)=>{
    skillSchema.remove({},(err,data)=>{
        if(err) res.status(404).json({status:false,message:err})
        data ? res.status(200).json({status:true,message:"All Data Deleted Successfully!"}) : res.status(404).json({status:false,message:"No Data Found!"});
    });
});

module.exports = skillRoute;