const User = require("../models/user");
// const requestMailer = require("../mailers/auth_mailer");

const emailWorkers = require("../workers/email_worker");
const queue = require("../config/kue");

module.exports.profile = function (req, res) {
  res.end("<h1>User Profile</h1>");
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    req.flash("success", "Signing Up successfull");
    return res.redirect("/users/profile");
  }
  return res.render("signUp", {
    title: "signup",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signIn", {
    title: "signin",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        return res.redirect("/users/signIn");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash("success", "LoggedIn successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You have been logged out");
  return res.redirect("/");
};

module.exports.passwordResetRedirect = function (req, res) {
  req.logout();

  return res.render("pass_reset", {
    title: "Reset Your Password",
  });
};

module.exports.passwordUpdate = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // requestMailer.newRequest(user);
    let job = queue.create("emails", user).save(function (err) {
      if (err) {
        console.log("error in creating a queue");
        return;
      }
      // req.flash("success", "Reset mail sent");
      return res.render("mail_sent", {
        name: user.name,
        flash: {
          success: "Reset mail sent",
        },
      });
      // console.log("job enqueued", job.id);
    });
  } else {
    req.flash("error", "Sign up to continue");
    return res.redirect("/users/signUp");
  }
};

module.exports.resetFormRedirect = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (user) {
      return res.render("reset_Form", {
        name: user.name,
        email: user.email,
      });
    }
    return res.redirect("/users/signUp");
  } catch (err) {
    return res.redirect("/users/signIn");
  }
};

module.exports.dbPasswordUpdate = async function (req, res) {
  try {
    if (req.body.password === req.body.confirm_password) {
      let user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          password: req.body.password,
        }
      );
      req.flash("alert", "Password Changed ...Sign In again");
      return res.redirect("/users/signIn");
    } else {
      req.flash("warning", "Password doesn't match");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("info", "Sign up to continue");
    return res.redirect("/users/signUp");
  }
};
