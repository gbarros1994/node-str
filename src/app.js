const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Connecta ao banco
mongoose.connect('mongodb+srv://gbarros1994:gbarros1994@cluster0.8fmf8.mongodb.net/ndstr?retryWrites=true&w=majority',
{
    useNewUrlParser: true , 
    useCreateIndex: true,
    useUnifiedTopology: true
});

//CARREGA OS MODELS
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//CARREGA AS ROTAS 
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;