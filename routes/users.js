const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersConrtoller = require("../controllers/users_controller");

// ======= handling users routes=========
router.get("/profile", passport.checkAuthentication, usersConrtoller.profile); //===== passport authentcation as middleware=========
router.get("/signUp", usersConrtoller.signUp);
router.get("/signIn", usersConrtoller.signIn);

router.post("/create", usersConrtoller.create);
router.post(
  //===== passport authentcation as middleware=========
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/signIn",
  }),
  usersConrtoller.createSession
);

router.get("/signOut", usersConrtoller.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/signIn" }),
  usersConrtoller.createSession
);

router.get("/resetPasswordPage", usersConrtoller.passwordResetRedirect);

router.post("/resetPassword", usersConrtoller.passwordUpdate);

router.get("/passwordReset/:email", usersConrtoller.resetFormRedirect);

router.post("/changePassword", usersConrtoller.dbPasswordUpdate);

module.exports = router;
