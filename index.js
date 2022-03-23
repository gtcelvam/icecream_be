const express = require('express');
const app = express();
const skill = require('./model/skill');
const homeImg = require('./model/homeImg');
const mongoose = require('mongoose');
const corsMiddleWare = require('./middleware/cors');
require('dotenv').config();

//Cors - access-control-allow-origin
app.use(corsMiddleWare);
//Body Parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Static File
app.use('/uploads',express.static('uploads'));

//Routers
app.use(skill);
app.use(homeImg);

//DB Connection
var URL = process.env.Access_Url;
mongoose.connect(URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    (err)=>{
    if(err){
        console.log("MongoDB Error is "+err);
    }else{
        console.log("DB Connected Successfully!");
    }
});

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("Server Started Successfully!");
})