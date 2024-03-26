const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const {ObjectId} = require("mongodb");

const patientSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        gender: String,
        address: String,
        phone_number: String,
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;