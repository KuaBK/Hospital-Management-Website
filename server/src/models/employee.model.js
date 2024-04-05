const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        gender: String,
        address: String,
        phone_number: String,
        position: String,
        specialization: String
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model("Employee", employeeSchema, "employees");

module.exports = Employee;