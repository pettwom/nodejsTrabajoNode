const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { get } = require('lodash');


const app = express();

// const { verifyToken, verifyRole } = require('../middleware/auth');

const Autor = require('../models').Autor;

app.post('/author', (req, res) => {
    let body = req.body;
    Autor.create({
            nombre: body.nombre,
            nacionalidad: body.nacionalidad,
            edad: body.edad,
        }).then(autor => res.status(201).json({
            ok: true,
            autor
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }));
});

//modificar autor
app.put("/author/:authorId", (req, res) => {
    let authorId = req.params.authorId;
    let body = _.pick(req.body, ["nombre", "nacionalidad", "edad"]);
    Autor.update(body, {
            where: {
                id: authorId,
            },
        })
        .then((autor) =>
            res.json({
                ok: true,
                autor,
            })
        )
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});
//listar author
app.get('/author', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    Autor.findAndCountAll({
            limit: limit,
            offset: from,
            attributes: ['nombre', 'nacionalidad', 'edad']
        })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                autor: rows,
                total: count
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            message: err
        }));

});
app.get('/author/:authorId', (req, res) => {
    let authorId = req.params.authorId;
    Autor.findOne({
            where: { id: authorId },
            attributes: ['nombre', 'nacionalidad', 'edad']
        })
        .then(author => res.status(200).json({
            ok: true,
            author
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))

});
module.exports = app;