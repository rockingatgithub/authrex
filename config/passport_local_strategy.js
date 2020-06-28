const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user ---> Passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username/ Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serialize the user ---> encrypt user id

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//decrypt user id...

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user ---> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

//check authentication,....

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signIn");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
