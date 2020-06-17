const config = require('../../config');
const sendgrid = require('@sendgrid/mail');


exports.send = async (to, subject, body) => {
    sendgrid.setApiKey(config.SENDGRID_API_KEY);
    return sendgrid.send({
        to: to,
        from: 'lucas.oliveira.developer321@gmail.com',
        subject: subject,
        html: body
    });

}