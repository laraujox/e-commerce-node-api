const service = require("../service/utils/email");

exports.send = async (req, res, next) =>{
    let query = {};
    for (const key in req.query) {
        query[key] = req.query[key];
    }
    try{
        const data = await service.send('lucas.araujo2@cooltura.com.br', 'Email deu certo', 'Corpo dahora');
        res.status(200).send({
            message: "Email succeed!",
            data: data
        });
    } catch(e){
        console.error(e);
        res.status(500).send({
            message: "Email failed!",
            data: e
        });
    }
};