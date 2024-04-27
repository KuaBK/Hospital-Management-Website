const express = require("express");
const router = express.Router();
const controller = require("../controllers/home.controller")

router.get("/patients", controller.patients);
router.get("/medicines", controller.medicines);

module.exports = router;