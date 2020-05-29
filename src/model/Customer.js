const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: {
        type: String,
        required: [true, "Nome é obrigatório."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email é obrigatório."],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Senha é obrigatória."],
        trim: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
});

module.exports = mongoose.model('Customer', Customer);