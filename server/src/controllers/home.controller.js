const moment = require("moment");
moment().format();

const Patient = require("../models/patient.model");
const Medicine = require("../models/medicine.model");

module.exports.patients = async (req, res) => {
    const patients = await Patient.find({status: "Đang điều trị"});

    res.json(patients);
}

module.exports.medicines = async (req, res) => {
    const medicines = await Medicine.find();
    const result = [];

    for (let i = 0; i < medicines.length; i++) {
        for (let j = 0; j < medicines[i].data.length; j++) {
            if (moment(medicines[i].data[j].expire).subtract(1, "M") <= moment()) {
                result.push(medicines[i]);
                break;
            }
        }
    }

    res.json(result);
}