const express = require('express');
const app = express();
const iceCream = require('./model/iceCream');
const mongoose = require('mongoose');
const corsMiddleWare = require('./middleware/cors');
require('dotenv').config();

//Cors - access-control-allow-origin
app.use(corsMiddleWare);

//Body Parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Routers
app.use(iceCream);

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