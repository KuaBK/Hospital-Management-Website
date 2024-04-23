const express = require("express");
const router = express.Router();
const controller = require("../controllers/device.controller")

router.get("/", controller.index);
router.post("/create", controller.create);
router.patch("/update", controller.update);
router.delete("/delete", controller.delete);

module.exports = router;