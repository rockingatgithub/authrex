const express = require("express");

const router = express.Router();

const homeApi = require("../../../controllers/api/v1/home_api");
const { home } = require("../../../controllers/home_controller");

router.get("/", homeApi.index);

module.exports = router;
