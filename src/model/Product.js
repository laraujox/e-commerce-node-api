const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    sku: {
        type: String,
        required: [true, "SKU é obrigatório."],
        trim: true,
        index:true,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Nome é obrigatório."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Preço é obrigatório."],
    },
    image: {
        type: String,
        required: [true, "Imagem é obrigatória."],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: false,
        trim: true
    }],
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model('Product', Product);