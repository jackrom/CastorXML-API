const nodeMailer = require('nodemailer');

class Notificaciones {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: "facilcontabilidad.net",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "info@facilcontabilidad.net",
                pass: "10092558@Sissi",
            },
        });
    }

    sendMessage(subject, template, ...emails) {

        let emailAddresses = [].concat(...emails);

        let mailOptions = {
            from: 'FacilContabilidad <info@facilcontabilidad.com>',
            to: emailAddresses,
            subject: subject,
            html: template,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el mensaje:', error);
            } else {
                console.log('Mensaje enviado:', info.response);
            }
        });
    }
}

module.exports = Notificaciones;
