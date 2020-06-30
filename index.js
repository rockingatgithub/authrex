const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-goole-oauth2-strategy"); //=======for google authentication
const { Mongoose } = require("mongoose");
const MongoStore = require("connect-mongo")(session); //stores session in db....
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const bodyParser = require("body-parser");

//=====middlewares==============

app.use(express.urlencoded());

//=======for parsing json request send from browser======
app.use(bodyParser.json());

//=======for parsing cookies stored in browsers==========
app.use(cookieParser());

//=========using static files from assets folder ==========
app.use(express.static("./assets"));

//==========midddlewares for using express-ejs-layouts =========
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//=========== set up the view engine ========
app.set("view engine", "ejs");
app.set("views", "./views");

//=======stores the session in database=========
app.use(
  session({
    name: "authrex",
    secret: "blahsomething", //change secret as per your need....
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err);
      }
    ),
  })
);

//=======using passport to use session as authentication==========
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//=======using noty to set notifications==========
app.use(flash());
app.use(customMware.setFlash);

// ========use express router==========
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
