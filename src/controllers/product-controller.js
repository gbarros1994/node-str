'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    repository
    .get()
    .then((data => {
        res.status(200).send(data);
    })).catch(e => {
        res.status(400).send(e);
    });
},

exports.getBySlug = (req, res, next) => {
    repository
    .getBySlug(req.params.slug)
    .then((data => {
        res.status(200).send(data);
    })).catch(e => {
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMaxLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMaxLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMaxLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    //SE OS DADOS FOREM INVÁLIDOS
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
    .create(req.body)
    .then((response => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        });
    })).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar produto', 
            data: e
        });
    });
};

exports.put = (req, res, next) => {
    repository
    .update(req.params.id, rep.body)
    .then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    });
};

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
    .then(x => {
        res.status(200).send({
            messagE: 'Produto removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover',
            data: e
        });
    });
};