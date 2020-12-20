'use strict'

const htpp = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');


const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

var route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "node",
        version: "0.1"
    });
});

app.use('/', route);

