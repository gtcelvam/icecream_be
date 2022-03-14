const express = require('express');
const app = express();
const skill = require('./model/skill');
const mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json());

//Routers
app.use(skill)

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