//=========storing mailer process in kue========

const queue = require("../config/kue");

const requestsMailer = require("../mailers/auth_mailer");

queue.process("emails", function (job, done) {
  console.log("emails worker is processing a job", job.data);

  requestsMailer.newRequest(job.data);

  done();
});
