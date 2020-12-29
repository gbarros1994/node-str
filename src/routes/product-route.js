'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.delete);
router.delete('/', controller.put);

module.exports = router;