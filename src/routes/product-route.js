'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/', controller.getBySlug);
router.post('/', authService.authorize ,controller.post);
router.put('/:id',  authService.authorize ,controller.delete);
router.delete('/',  authService.authorize ,controller.put);

module.exports = router;