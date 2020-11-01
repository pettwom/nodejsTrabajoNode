const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');


const app = express();

// const { verifyToken, verifyRole } = require('../middleware/auth');

const Libro = require('../models').Libro;


app.get("/books", (req, res) => {
    // app.get('/books', [verifyToken, verifyRole], (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
        // state: true
    };
    Libro.findAndCountAll({
            limit: limit,
            offset: from,
            where: defaultFilters,
            attributes: ["titulo", "descripcion", "precio"]
        })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                libros: rows,
                total: count
            })
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                message: err
            })
        );
});
// crear nuevo libro
app.post('/books', (req, res) => {
    let body = req.body;

    Libro.create({
            titulo: body.titulo,
            descripcion: body.descripcion,
            precio: body.precio,
        })
        .then(libro => {
            res.status(201).json({
                ok: true,
                libro
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))


});
//listar un libro
app.get("/books/:bookId", (req, res) => {
    let bookId = req.params.bookId;
    Libro.findOne({
            where: { id: bookId },
            attributes: ["titulo", "descripcion", "precio"]
        })
        .then(
            libro => res.status(200).json({
                ok: true,
                libro
            })
        )
        .catch(
            err => res.status(400).json({
                ok: false,
                err
            }))
});
//actualizar libro
app.put("/books/:bookId", (req, res) => {
    let bookId = req.params.bookId;
    let body = _.pick(req.body, ['titulo', 'descripcion', 'precio']);

    Libro.update(
            body, {
                where: {
                    id: bookId
                }
            })
        .then(
            libro => res.status(200).json({
                ok: true,
                libro
            })
        )
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
})

// Borrar un libro
app.delete('/books/:bookId', (req, res) => {
    let bookId = req.params.bookId;

    Libro.destroy({
            where: { id: bookId }
        })
        .then(libro => res.status(200).json({
            ok: true,
            libro
        }))
        .catch(err => res.statu(400).json({
            ok: false,
            err
        }))

});

module.exports = app;