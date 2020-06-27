const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersConrtoller = require("../controllers/users_controller");

router.get("/profile", usersConrtoller.profile);
router.get("/signUp", usersConrtoller.signUp);
router.get("/signIn", usersConrtoller.signIn);

router.post("/create", usersConrtoller.create);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/signIn",
  }),
  usersConrtoller.createSession
);
module.exports = router;
