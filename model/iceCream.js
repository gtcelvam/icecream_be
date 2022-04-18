const express = require('express');
const iceCream = express();
const iceCreamRoute = require('../router/iceCreamRoute');

iceCream.use('/icecream',iceCreamRoute);

module.exports = iceCream;