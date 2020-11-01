const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');


const app = express();

// const { verifyToken, verifyRole } = require('../middleware/auth');

const Carrito = require('../models').Carrito;

app.post('/trolley', (req, res) => {
    let body = req.body;
    Carrito.create({
            nit: body.nit,
            name: body.name
        }).then(trolley => res.status(201).json({
            ok: true,
            trolley
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }));
});
//modificar autor
app.put("/trolley/:trolleyId", (req, res) => {
    let trolleyId = req.params.trolleyId;
    let body = _.pick(req.body, ["nit", "name"]);
    Carrito.update(body, {
            where: {
                id: trolleyId,
            },
        })
        .then((trolley) =>
            res.json({
                ok: true,
                trolley,
            })
        )
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});
//listar trolley
app.get('/trolley', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);


    Carrito.findAndCountAll({ limit: limit, offset: from, attributes: ['nit', 'name'] })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                trolley: rows,
                total: count
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            message: err
        }));

});
//devolver un solo dato
app.get("/trolley/:tralleyId", (req, res) => {
    let trolleyId = req.params.trolleyId;
    Carrito.findOne({
            where: { id: trolleyId },
            attributes: ["nit", "name"]
        })
        .then(trolley => res.status(200).json({
            ok: true,
            trolley
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
})
module.exports = app;