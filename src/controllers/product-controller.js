'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product
    .find({
        active: true
    }, 'title price slug')
    .then((data => {
        res.status(200).send(data);
    })).catch(e => {
        res.status(400).send(e);
    });
},

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

    var product = new Product();
    product
    .save()
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
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
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
    Product
    .findOneAndRemove(req.params.id)
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

exports.getBySlug = (req, res, next) => {
    Product
    .findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
    .then((data => {
        res.status(200).send(data);
    })).catch(e => {
        res.status(400).send(e);
    });
}