const passport = require("passport");

const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      //configure with your google ouath api credentials....
      clientID: "",
      clientSecret: "",
      callbackURL: "",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in finding user  --> google auth");
        }
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user", err);
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
