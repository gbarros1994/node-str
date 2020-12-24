const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'node',
        version: '01'
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

const create = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
});

app.use('/', route);

module.exports = app;