const ValidatorContract = require('../validator/validator');
const service = require("../service/customer");

exports.post = async (req, res, next) =>{
    let contract = new ValidatorContract();
    contract.isRequired(req.body.name, "O campo Nome é obrigatório!");
    contract.isRequired(req.body.email, "O campo Email é obrigatório!");
    contract.isRequired(req.body.password, "O campo Senha é obrigatório!");

    if(!contract.isValid()){
        res.status(400).send({
            message: "Create customer failed!",
            data: contract.errors()
        }).end();
        return;
    }

    try{
        const data = await service.create(req.body);
        res.status(201).send({
            message: "Create customer succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Create customer failed!",
            data: e
        });
    }
};

exports.get = async (req, res, next) =>{
    let query = {};
    for (const key in req.query) {
        query[key] = req.query[key];
    }
    try{
        const data = await service.get(query);
        res.status(201).send({
            message: "Get customer succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Get customer failed!",
            data: e
        });
    }
};
