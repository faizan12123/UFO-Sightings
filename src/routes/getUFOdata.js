const express = require("express");
const router = express.Router();

const getUFO = require("../controllers/getUFO");

router.get("/", getUFO);

module.exports = router;
