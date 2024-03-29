const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        gender: String,
        address: String,
        phone_number: String,
        status: String,
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;