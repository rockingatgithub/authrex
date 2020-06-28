const nodemailer = require("../config/nodemailer");

exports.newRequest = (request) => {
  let htmlString = nodemailer.renderTemplate(
    { request: request },
    "requests/newRequest.ejs"
  );
  console.log("inside mailer", request);

  nodemailer.transporter.sendMail(
    {
      from: "sidproductionmail@gmail.com",
      to: request.email,
      subject: "To change your password",
      html: htmlString,
    },
    function (err, info) {
      if (err) {
        console.log("error in sending mail", err);
        return;
      }
      // console.log("Message Sent", info);
      return;
    }
  );
};
