const patientRoutes = require("./patient.route");
const userRoutes = require("./user.route");
const employeeRoutes = require("./employee.route");
const medicineRoutes = require("./medicine.route");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

module.exports = app => {
    app.use(cookieParser('MY SECRET'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors({
       credentials: true, origin: true 
      }));
    

    app.use("/patient", patientRoutes);
    app.use("/user", userRoutes);
    app.use("/employee", employeeRoutes);
    app.use("/medicine", medicineRoutes);
}