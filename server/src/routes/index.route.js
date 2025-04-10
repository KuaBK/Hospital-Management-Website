const homeRoutes = require("./home.route");
const patientRoutes = require("./patient.route");
const historyRoutes = require("./history.route");
const userRoutes = require("./user.route");
const employeeRoutes = require("./employee.route");
const medicineRoutes = require("./medicine.route");
const testRoutes = require("./test.route");
const deviceRoutes = require("./device.route");

const cors = require('cors');
const express = require("express");
const cookieParser = require("cookie-parser");

const allowedOrigins = [
  'https://hospital-management-website-psi.vercel.app',
  'https://hospital-management-website-git-main-kuabks-projects.vercel.app',
  'http://localhost:5173' // thêm local nếu dev
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Không được phép truy cập từ origin này!'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};


module.exports = app => {
    app.use(cookieParser('MY SECRET'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
    
    
    app.use("", homeRoutes);
    app.use("/patient", patientRoutes);
    app.use("/history", historyRoutes);
    app.use("/test", testRoutes);
    app.use("/user", userRoutes);
    app.use("/employee", employeeRoutes);
    app.use("/medicine", medicineRoutes);
    app.use("/device", deviceRoutes)
}