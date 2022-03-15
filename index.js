const express = require('express');
const app = express();
const skill = require('./model/skill');
const mongoose = require('mongoose');
const corsMiddleWare = require('./middleware/cors');
require('dotenv').config();


app.use(express.json());

//Routers
app.use(skill)

//CORS HEADER
app.use(function(req, res, next) {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options('*',corsMiddleWare);
app.use(corsMiddleWare);


//DB Connection
var URL = process.env.Access_Url;
mongoose.connect(URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    (err)=>{
    if(err){
        console.log("MongoDB Error is "+err);
    }
    console.log("DB Connected Successfully!");
});

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("Server Started Successfully!");
})