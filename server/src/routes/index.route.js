const homeRoutes = require("./home.route");
const patientRoutes = require("./patient.route");
const historyRoutes = require("./history.route");
const userRoutes = require("./user.route");
const employeeRoutes = require("./employee.route");
const medicineRoutes = require("./medicine.route");
const testRoutes = require("./test.route");
const deviceRoutes = require("./device.route");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

module.exports = app => {
    app.use(cookieParser('MY SECRET'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors({
        origin: "https://hospital-management-website-psi.vercel.app",
        credentials: true
      }));
    
    app.use("", homeRoutes);
    app.use("/patient", patientRoutes);
    app.use("/history", historyRoutes);
    app.use("/test", testRoutes);
    app.use("/user", userRoutes);
    app.use("/employee", employeeRoutes);
    app.use("/medicine", medicineRoutes);
    app.use("/device", deviceRoutes)
}
