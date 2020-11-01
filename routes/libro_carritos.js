const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');


const app = express();

// const { verifyToken, verifyRole } = require('../middleware/auth');

const Libro_carrito = require('../models').Libro_carrito;

module.exports = app;