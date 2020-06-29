const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");
const captchaController = require("../controllers/gCaptchaController");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/api", require("./api"));
router.post("/send", captchaController.verify);
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;
