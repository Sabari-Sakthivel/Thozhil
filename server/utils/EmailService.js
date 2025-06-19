const nodemailer = require("nodemailer");
require("dotenv").config(); // Make sure this is at the top if not already loaded in your entry file

const sendEmail = async (to, subject, html) => {
  // Create transporter for Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,  // Corrected env var key
      pass: process.env.EMAIL_PASS,  // App password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    // Verify transporter connection
    await transporter.verify();
    console.log("SMTP server is ready to send messages");

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
