const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "authrex_dev",
  smtp: {
    service: "gmail", //set you mailer and configure
    host: "smtp.google.com",
    port: 587,
    secure: false,
    auth: {
      user: "sidproductionmail@gmail.com",
      pass: "2509@Course",
    },
  },
  google_clientID:
    "218521158723-ja54l7hakp62o6k0mc5tj52tvmcq04oq.apps.googleusercontent.com",
  google_clientSecret: "nxWf6s19vpa1oT8bGIV_qsgT",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "authrex",
  google_reCaptha_secret_key: "6LcSrqoZAAAAAADgBLi85V2RexZiygR3Nr3trFrz",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.AUTHREX_ASSET_PATH,
  session_cookie_key: process.env.AUTHREX_SESSION_COOKIE_KEY,
  db: process.env.AUTHREX_DATABASE,
  smtp: {
    service: process.env.AUTHREX_SMTP_SERVICE, //set you mailer and configure
    host: process.env.AUTHREX_SMTP_HOST,
    port: process.env.AUTHREX_SMTP_PORT,
    secure: process.env.AUTHREX_SMTP_SECURE,
    auth: {
      user: process.env.AUTHREX_SMTP_AUTH_USER,
      pass: process.env.AUTHREX_SMTP_AUTH_PASS,
    },
  },
  google_clientID: process.env.AUTHREX_GOOGLE_CLIENT_ID,
  google_clientSecret: process.env.AUTHREX_GOOGLE_CLIENT_SECRET,
  google_callbackURL: process.env.AUTHREX_GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.AUTHREX_JWT_SECRET,
  google_reCaptha_secret_key: process.env.AUTHREX_GOOGLE_RECAPTCHA_SECRET_KEY,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

// console.log(process.env.AUTHREX_ENVIRONMENT + "isit");

module.exports =
  eval(process.env.AUTHREX_ENVIRONMENT) === undefined
    ? development
    : eval(process.env.AUTHREX_ENVIRONMENT);
