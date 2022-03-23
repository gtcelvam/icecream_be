const express = require('express');
const homeImgRoute = express.Router();
const homeBgSchema = require('../schema/homeBgSchema');
const multer = require('multer');
const http = require('http');

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename(req,file,cb){
        const name = (Math.random() * 10).toString().split('.')[1]+'.'+file.originalname.split('.')[1];
        cb(null,name);
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 1
    },
    fileFilter : fileFilter
})



homeImgRoute.post('/',upload.single('file'),(req,res)=>{
        homeBgSchema.deleteMany({active:true}).then(()=>{
            const data = new homeBgSchema({
                name : req.body.name,
                imgUrl : req.file.path,
                active:req.body.active
            });
            data.save().then((err,file)=>{
                if(err) res.status(404).json(err)
                res.status(200).json(file)
            });
        });
});

homeImgRoute.get('/',(req,res)=>{
    homeBgSchema.findOne({active : true}).then((err,data)=>{
        if(err) res.status(404).json(err)
        res.status(200).json(data)
    })
})

module.exports = homeImgRoute