const nodemailer = require("nodemailer");
const config = require("../config");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

// Replace these with your email and SMTP server details
const senderEmail = config.getEmailSenderId(); //"donotreply@tivrahealth.com";
const senderPassword = config.getEmailSenderPwd(); //"T!vra2@23";
const smtpHost = config.getEmailServiceProviderSmtpHost(); //"smtp.gmail.com";
const smtpPort = config.getEmailServiceProviderSmtpPort(); //465; // 465 or 587

// Send OTP email
function sendEmail(userEmailId, subject, mailContext, fileName) {
  // Read HTML file contents
  const templatePath = path.join(__dirname, "..", fileName);

  return new Promise((resolve, reject) => {
    try {
      // Create a transporter object using SMTP
      const transporter = nodemailer.createTransport({
        // host: smtpHost,
        port: smtpPort,
        service: config.getEmailServiceProvider(), //"gmail",
        secure: true, // Set to true if using a secure connection (e.g., for Gmail, use port 465 and secure: true)
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

      // Read the EJS template
      fs.readFile(templatePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          return;
        }

        // Dynamic values to inject
        const values = {
          otpVal: mailContext,
        };

        // Use EJS to inject values into the template
        const updatedHtml = ejs.render(data, values);

        // Email content
        const mailOptions = {
          from: senderEmail,
          to: userEmailId,
          subject: subject,
          html: updatedHtml,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            reject(error);
          } else {
            console.log("Email sent:", info.response);
            resolve(info);
          }
        });
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
}

module.exports = { sendEmail };
