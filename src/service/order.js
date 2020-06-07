const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.create = async (body) =>{
    let order = new Order();
    order.customer = body.customer;
    order.items = body.items;
    order.status = body.status;

    return await order.save();
}

exports.get = async (query) =>{
    return await Order.find(query)
    .populate('customer', 'name')
    .populate('items.product', 'name price');
}