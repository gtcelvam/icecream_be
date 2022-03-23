const express = require('express');
const homeImg = express();
const homeImgRoute = require('../router/homeImgRoute');

homeImg.use('/home/image',homeImgRoute);

module.exports = homeImg;