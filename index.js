const express = require('express');
const app = express();
const skill = require('./model/skill');
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();


app.use(express.json());

//Routers
app.use(skill)

//DB Connection
const env = process.env.MONGODB.toString();
mongoose.connect(env,{ useNewUrlParser: true },()=>{
    console.log("DB Connected Successfully!");
})

const port = process.env.port || 4000;
app.listen(port,()=>{
    console.log("Server Started Successfully!");
    console.log(process.env.MONGODB)
})