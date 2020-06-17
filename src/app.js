const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(config.MONGO_CS, { useUnifiedTopology: true,  useNewUrlParser: true });

//Carrega models
const Product = require('./model/Product');
const Customer = require('./model/Customer');
const Order = require('./model/Order');

//Load routes
const probe = require("./route/probe");
const product = require("./route/product");
const customer = require("./route/customer");
const order = require("./route/order");
const email = require("./route/email");

//Convert body to json & Encode query parameter
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', probe);
app.use('/product', product);
app.use('/customer', customer);
app.use('/order', order);
app.use('/email', email);

module.exports = app;