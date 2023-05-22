const nodemailer = require('nodemailer');

const {
    EMAIL_ADDRESS,
	PASSWORD
} = process.env

// send mail
const sendEmail = (to, txt) => {
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ADDRESS,
			pass: PASSWORD
        }
    })

    const mailOptions = {
        from: EMAIL_ADDRESS,
        to: to,
        subject: "DocPortal Service",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DocPortal Website.</h2>
                <p style="text-align: center; font-weight: bold">${txt}</p>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) return err;
        return info
    })
}

module.exports = sendEmail;