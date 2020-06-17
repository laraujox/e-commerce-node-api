const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (body) =>{
    let customer = new Customer();
    customer.name = body.name;
    customer.email = body.email;
    customer.password = body.password;

    return await customer.save();
}

exports.get = async (query) =>{
    return await Customer.find(query);
}

exports.authenticate = async (data) =>{
    return Customer.findOne(data);
}