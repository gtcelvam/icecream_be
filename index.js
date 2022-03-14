const express = require('express');
const app = express();
const skill = require('./model/skill');
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();


app.use(express.json());

//Routers
app.use(skill)

//DB Connection
mongoose.connect(process.env.MONGODB,()=>{
    console.log("DB Connected Successfully!");
})

const port = process.env.port || 4000;
app.listen(port,()=>{
    console.log("Server Started Successfully!");
})