const ValidatorContract = require('../validator/validator');
const service = require("../service/product");
const config = require("../config");
const azure = require("azure-storage");
const guid = require("guid");

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
            message: "Get product succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Get product failed!",
            data: e
        });
    }
};

exports.post = async (req, res, next) =>{
    const blobSvc = azure.createBlobService(config.AZURE_CS);
    const rawdData = req.body.image;
    const matches = rawdData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const type = matches[1];
    const buffer = new Buffer(matches[2], 'base64');
    const typeImage = type.substr(type.length - 3, type.length)
    let fileName = guid.raw().toString() + "." + typeImage;

    let retornoContainer = await blobSvc.createBlockBlobFromText('productimages', fileName, buffer, {
        contentType: type
    }, (error, result, response) => {
        if(error){
            fileName = 'default-product.png';
        }
    });
    const imagePath = config.CONTAINER_PATH + fileName;
    req.body.image = imagePath;

    let contract = new ValidatorContract();
    contract.isRequired(req.body.name, "O campo Nome é obrigatório!");
    contract.isRequired(req.body.sku, "O campo SKU é obrigatório!");
    contract.isRequired(req.body.price, "O campo Price é obrigatório!");

    if(!contract.isValid()){
        res.status(400).send({
            message: "Create product failed!",
            data: contract.errors()
        }).end();
        return;
    }

    try{
        const data = await service.create(req.body);
        console.info("Created product with sku: " + req.body.sku);
        res.status(201).send({
            message: "Create product succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Create product failed!",
            data: e
        });
    }
};

exports.put = async(req, res, next) =>{
    let contract = new ValidatorContract();
    contract.isRequired(req.query.sku, "O campo SKU é obrigatório!");

    if(!contract.isValid()){
        res.status(400).send({
            message: "Create product failed!",
            data: contract.errors()
        }).end();
        return;
    }
    try{
        const data = await service.update(req.query.sku, req.body);
        res.status(200).send({
            message: "Update product succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Update product failed!",
            data: e
        });
    }
};

exports.delete = async (req, res, next) =>{
    let contract = new ValidatorContract();
    contract.isRequired(req.query.sku, "O campo SKU é obrigatório!");

    if(!contract.isValid()){
        res.status(400).send({
            message: "Create product failed!",
            data: contract.errors()
        }).end();
        return;
    }
    try{
        const data = await service.delete(req.query.sku);
        res.status(200).send({
            message: "Delete product succeed!",
            data: data
        })
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Delete product failed!",
            data: e
        });
    }
};