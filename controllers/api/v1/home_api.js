// module.exports.index = function (req, res) {
//   return res.json(200, {
//     message: "Successfully Login",
//   });
// };

const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid Username/password",
      });
    }
    return res.json(200, {
      message: "Sign in successful, here is your token...",
      data: {
        token: jwt.sign(user.toJSON(), "", { expiresIn: "100000" }), //give json seret used.....
      },
    });
  } catch (err) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
