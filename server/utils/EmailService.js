const nodemailer =require("nodemailer");

const sendEmail = async ( to, subject, html) => {
    const transporter = nodemaailer. createTransport ({
        service: 'gmail',

        auth : {
            user: process.env.Email_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized : false
        },
    });

    const mailOptions = {
        from : process.env.Email_USER,
        to,
        subject,
        html,
    };
    try {
        await transporter.sendEmail(mailOptions);
    } catch (error) {
        console.error("Error Sending Email:",error)
    }
}
module.exports = sendEmail;