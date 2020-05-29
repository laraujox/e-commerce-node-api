const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.get = async (query) =>{
    return await Product.find(query);
}

exports.create = async (body) =>{
    let product = new Product();
    product.name = body.name;
    product.sku = body.sku;
    product.price = body.price;

    return await product.save();
}

exports.update = async (sku, body) =>{
    let product = await Product.findOne({
        sku: sku
    });
    for (const key in body) {
        product[key] = body[key];
    }

    return await product.save();
}
exports.delete = async (sku, body) =>{
    const product = await Product.findOne({
        sku: sku
    });

    return await product.remove();
}