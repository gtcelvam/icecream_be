const express = require('express');
const app = express();
const skill = require('./model/skill');
const mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json());

//Routers
app.use(skill)

//DB Connection
const URL = process.env.MONGODB;
mongoose.connect(URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    ()=>{
    console.log("DB Connected Successfully!");
})

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("Server Started Successfully!");
})