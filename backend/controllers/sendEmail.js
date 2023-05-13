const nodemailer = require('nodemailer');

const {
    EMAIL_ADDRESS,
	PASSWORD
} = process.env

// send mail
const sendEmail = (to, url, txt) => {
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
            <p>Congratulations! You're almost set to start using DocPortal.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) return err;
        return info
    })
}

module.exports = sendEmail;