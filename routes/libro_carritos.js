const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const bodyParser = require('body-parser');


const app = express();

const Libro_carrito = require('../models').Libro_carrito;
//añadir compra
app.post('/book_trolley', (req, res) => {
    let body = req.body;
    console.log(body)
    Libro_carrito.create({
            cantidad: body.cantidad,
            libro_id: body.libro_id,
            cart_id: body.cart_id,
        })
        .then(book_trolley => res.status(201).json({
            ok: true,
            book_trolley
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
});

//listar compras
app.get("/book_trolley", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 4;
    limit = Number(limit);

    Libro_carrito.findAndCountAll({
            limit: limit,
            offset: from,
            attributes: ['cantidad', 'libro_id', 'cart_id']
        })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                book_trolley: rows,
                total: count
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            message: err
        }))

});
//listar una compra
app.get("/book_trolley/:book_trolleyId", (req, res) => {
    let book_trolleyId = req.params.book_trolleyId;
    Libro_carrito.findOne({
            where: { id: book_trolleyId }
        })
        .then(book_trolley => res.status(200).json({
            ok: true,
            book_trolley
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
});

app.put("/book_trolley/:book_trolleyId", (req, res) => {
    let book_trolleyId = req.params.book_trolleyId;
    let body = _.pick(req.body, ['cantidad', 'libro_id', 'cart_id']);
    Libro_carrito.update({
            where: { id: book_trolleyId }
        })
        .then(book_trolley => res.status(200).json({
            ok: true,
            book_trolley
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
})
module.exports = app;