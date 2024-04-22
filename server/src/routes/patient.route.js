const express = require("express");
const router = express.Router();
const controller = require("../controllers/patient.controller")

router.get("/", controller.index);
router.get("/:patientID", controller.detail);
router.get("/:patientID/getDoctorList", controller.getDoctorList);
router.post("/create", controller.create);
router.patch("/update", controller.update);
router.delete("/delete", controller.delete);
router.post("/:patientID/createTest", controller.createTest);

module.exports = router;