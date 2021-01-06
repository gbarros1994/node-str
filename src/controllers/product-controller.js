'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const config = require('../config');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
},

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMaxLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMaxLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMaxLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    //SE OS DADOS FOREM INVÁLIDOS
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        const blobSvc = azure.createBlobService(config.userImagesBlobConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        //pega a imagem em base64
        let rawdata = req.body.image;
        //imagem vem com cabeçalho, então retiramos os seguintes itens
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        //cria um buffer da imagem
        let buffer = new Buffer(matches[2], 'base64');

        //salva a imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.jpg';
            }
        })

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: filename
        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, rep.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            messagE: 'Produto removido com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};