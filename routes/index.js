const express = require('express');

const app = express();

app.use(require('./libros'));
app.use(require('./autors'));
app.use(require('./libro_carritos'));
app.use(require('./carritos'));

module.exports = app;