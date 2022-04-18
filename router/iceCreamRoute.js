const express = require('express');
const iceCreamRoute = express.Router();
const iceCreamSchema = require('../schema/iceCreamSchema');

iceCreamRoute.get('/',(req,res)=>{
    iceCreamSchema.find({},{__v:0}).then(data=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
    })
});
iceCreamRoute.get('/:category',(req,res)=>{
    const category = req.params.category;
    iceCreamSchema.find({category : category},{__v:0}).then(data=>{
        res.header("Access-Control-Allow-Origin", "*");
        data.length === 0 ? res.status(500).json('No data found') : res.status(200).send(data);
    }).catch(err => res.status(404).json(err))
});



iceCreamRoute.post('/',async(req,res)=>{
    const data = new iceCreamSchema({
        name : req.body.name,
        type : req.body.type,
        price : req.body.price,
        image : req.body.image,
        category : req.body.category
    });
    try {
        const result = await data.save();
        res.status(200).json({status:true,message:"Data Added Successfully!"});
    } catch (error) {
        res.status(404).json({status:false,message:error});
    }
    
})

iceCreamRoute.post('/all',(req,res)=>{
    iceCreamSchema.insertMany(iceCreamData).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(404).json(err);
    })
});

iceCreamRoute.patch('/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    iceCreamSchema.findByIdAndUpdate({_id :id},data,{new: true,upsert:true},(err,data)=>{
        if(err) res.status(404).json({status:false,message:err})
        data ? res.status(200).json({status:true,message:'Date Updated Successfully!'}) : res.status(404).json({status:false,message:"No Data Found!"});
    })
});

iceCreamRoute.delete('/:id',(req,res)=>{
    const id = req.params.id
    iceCreamSchema.findByIdAndRemove({_id : id},(err,data)=>{
        if(err) res.status(404).json({status:false,message:err})
        data ? res.status(200).json({status:true,message:"Data Deleted Successfully!"}) : res.status(404).json({status:false,message:"No Data Found!"});
    });
})

module.exports = iceCreamRoute;