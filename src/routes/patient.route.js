const express = require("express");
const router = express.Router();
const controller = require("../controllers/patient.controller")

router.get("/", controller.index);
router.post("/create", controller.create);
router.delete("/delete", controller.delete);

module.exports = router;