require('dotenv').config();
const nodemailer = require('nodemailer');
const ApiError = require("../error/ApiError");

class Mail_Service {

    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            }

            // {
            //     host: process.env.SMTP_HOST,
            //     port: process.env.SMTP_PORT,
            //     tls: {
            //         rejectUnauthorized: false
            //     }
            // }
        )
    }

    async sendActivationMail(to, link) {

        console.log("SMTP_USER:  ", process.env.SMTP_USER)
        console.log("SMTP_PASSWORD:  ", process.env.SMTP_PASSWORD)

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.SITE_URL}`,
            text: '',
            html:
                `
                    <div>
                        <h1>
                            Длф активации аккаунта перейдите по ссылке
                            <a href="${link}">${link}</a>
                        </h1>
                    </div>
                `
        })

    }
}

module.exports = new Mail_Service();