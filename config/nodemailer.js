const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// =======configuring transporter for sending mails =======

let transporter = nodemailer.createTransport({
  service: "", //set you mailer and configure
  host: "",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering tempalte..");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
