const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Connecta ao banco
mongoose.connect(config.connectionString,
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
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');
const order = require('./models/order');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
     extended: false
}));

//Habilita o CORS
app.use(function(req, res, next) {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;