const express = require("express")
const router = express.Router()

const getUFOall = require("../controllers/getUFOall")
const getUFOlocation = require("../controllers/getUFOlocation")
const getUFOdate = require("../controllers/getUFOdate")

router.get("/all", getUFOall)
router.get('/byLocation', getUFOlocation)
router.get('/byDate', getUFOdate)

module.exports = router;