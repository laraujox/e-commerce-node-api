const ValidatorContract = require('../validator/validator');
const service = require("../service/customer");
const email = require("../service/email");
const md5 = require("md5");

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

    const encryptedPsw = md5(req.body.password);
    req.body.password = encryptedPsw;

    try{
        const data = await service.create(req.body);

        email.send(req.body.email, 'Bem vindo!', global.EMAIL_TMPL.replace('{0}', req.body.name));

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
        res.status(200).send({
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
