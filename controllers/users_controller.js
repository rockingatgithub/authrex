const User = require("../models/user");
const requestMailer = require("../mailers/auth_mailer");

module.exports.profile = function (req, res) {
  res.end("<h1>User Profile</h1>");
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
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
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};

module.exports.passwordResetRedirect = function (req, res) {
  return res.render("pass_reset", {
    title: "Reset Your Password",
  });
};

module.exports.passwordUpdate = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    requestMailer.newRequest(user);
  } else {
    return res.redirect("/users/signUp");
  }
};

module.exports.resetFormRedirect = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
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
      console.log("mail is", req.body.email, "pass is", req.body.password);
      let user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          password: req.body.password,
        }
      );
      return res.redirect("/users/signIn");
    }
  } catch (err) {
    return res.redirect("/users/signUp");
  }
};
