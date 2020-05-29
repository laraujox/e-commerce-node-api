const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
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

module.exports = mongoose.model('Order', Order);