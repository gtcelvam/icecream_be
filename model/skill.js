const express = require('express');
const skill = express();
const skillRoute = require('../router/skillRoute');

skill.use('/skill',skillRoute);

module.exports = skill;