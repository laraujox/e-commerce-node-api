const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

//Every request body will be converted to json
app.use(bodyParser.json())
//Encode every query parameter
app.use(bodyParser.urlencoded({ extended: false }))

const probe = router.get('/', (req, res, next) => {
    res.status(200).send({
        status: "OK"
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send({
        body: req.body
    });
});

const update = router.put('/:id', (req, res, next) => {
    const id = req.params.id;

    res.status(200).send({
        id: id,
        item: req.body
    });
});

const del = router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    res.status(200).send({
        id: id
    });
});

app.use('/', probe);
app.use('/', create);
app.use('/', update);
app.use('/', del);

module.exports = app;