const patientRoutes = require("./patient.route");
const historyRoutes = require("./history.route");
const userRoutes = require("./user.route");
const employeeRoutes = require("./employee.route");
const medicineRoutes = require("./medicine.route");
const testRoutes = require("./test.route");

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
    app.use("/history", historyRoutes);
    app.use("/test", testRoutes);
    app.use("/user", userRoutes);
    app.use("/employee", employeeRoutes);
    app.use("/medicine", medicineRoutes);
}