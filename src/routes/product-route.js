'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/', controller.getBySlug);
router.post('/', authService.authorize ,controller.post);
router.put('/:id', controller.delete);
router.delete('/', controller.put);

module.exports = router;