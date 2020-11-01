const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');


const app = express();

// const { verifyToken, verifyRole } = require('../middleware/auth');

const Autor = require('../models').Autor;

module.exports = app;