const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  // Create a transporter for Gmail SMTP service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider here (Gmail in this case)
    auth: {
      user: process.env.Email_USER, // Your Gmail email address
      pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
    },
    tls: {
      rejectUnauthorized: false, // Allow TLS connection (you might remove this if using OAuth)
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.Email_USER, // Sender email
    to, // Recipient email
    subject, // Subject of the email
    html, // HTML body of the email (HTML content can be sent here)
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    // Log error details in case of failure
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
