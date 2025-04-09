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

const allowedOrigins = [
  "https://hospital-management-website-psi.vercel.app",
  "https://hospital-management-website-git-main-kuabks-projects.vercel.app", // thêm local nếu dev
  "https://hospital-management-website-c9g06nj3w-kuabks-projects.vercel.app" // thêm domain khác nếu có
];

module.exports = app => {
    app.use(cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true
    }));
    app.use(cookieParser('MY SECRET'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use("", homeRoutes);
    app.use("/patient", patientRoutes);
    app.use("/history", historyRoutes);
    app.use("/test", testRoutes);
    app.use("/user", userRoutes);
    app.use("/employee", employeeRoutes);
    app.use("/medicine", medicineRoutes);
    app.use("/device", deviceRoutes)
}