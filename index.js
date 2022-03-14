const express = require('express');
const app = express();
const skill = require('./model/skill');
const mongoose = require('mongoose');


app.use(express.json());

//Routers
app.use(skill)

//DB Connection
mongoose.connect('mongodb+srv://thselvan:gtcelvaM2005@ts-admin.0c5cq.mongodb.net/ts_admin?retryWrites=true&w=majority',()=>{
    console.log("DB Connected Successfully!");
})

const port = process.env.port || 4000;
app.listen(port,()=>{
    console.log("Server Started Successfully!");
})