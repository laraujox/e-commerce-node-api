const ValidatorContract = require('../validator/validator');
const service = require("../service/order");
const auth = require("../service/utils/auth")
const guid = require('guid');

exports.get = async (req, res, next) =>{
    let query = {};
    for (const key in req.query) {
        query[key] = req.query[key];
    }
    //Possíveis métodos:
    // findOne --> encontra só um elemento
    // findById --> Faz a busca pelo ID
    try{
        const data = await service.get(query);
        res.status(200).send({
            message: "Get order succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Get order failed!",
            data: e
        });
    }
};

exports.post = async (req, res, next) =>{
    const customer = auth.decodeToken(req.headers['x-access-token']);

    const newOrder = {
        customer: customer.id,
        items: req.body.items,
        status: req.body.status,
    }

    try{
        const data = await service.create(newOrder);
        res.status(201).send({
            message: "Create order succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Create order failed!",
            data: e
        });
    }
};
