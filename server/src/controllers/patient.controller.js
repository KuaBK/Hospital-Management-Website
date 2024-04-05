const Patient = require("../models/patient.model");
const Employee = require("../models/employee.model");

module.exports.index = async (req, res) => {
    const patients = await Patient.find({name: new RegExp(req.query.keyword, "i")});
    res.json(patients);
}

module.exports.detail = async (req, res) => {
    const data = await Patient.findById(req.params.patientID);
    res.json(data);
}

module.exports.getDoctorList = async (req, res) => {
    const doctors = await Employee.find({position: "Bác sĩ"});
    res.json(doctors);
}

module.exports.create = async (req, res) => {
    const phoneNumberCheck = await Patient.find({phone_number: req.body.data.phone_number});
    const check = await Patient.find(req.body.data);
    if (check.length == 0 && phoneNumberCheck == 0) {
        if (req.body.data.name == "") {
            res.end("Vui lòng cung cấp tên của bệnh nhân");
        } else if (req.body.data.age == "") {
            res.end("Vui lòng cung cấp tuổi của bệnh nhân");
        } else if (req.body.data.gender == "Chọn giới tính") {
            res.end("Vui lòng cung cấp giới tính của bệnh nhân");
        } else if (req.body.data.address == "") {
            res.end("Vui lòng cung cấp địa chỉ của bệnh nhân");
        } else if (req.body.data.phone_number == "") {
            res.end("Vui lòng cung cấp số điện thoại của bệnh nhân");
        } else {
            const patient = await new Patient(req.body.data);
            await patient.save()
            res.send("Success");
        }
    } else {
        if (check.length == 0) {
            res.end("Số điện thoại đã tồn tại trong hệ thống");
        } else {
            res.end("Bệnh nhân đã tồn tại trong hệ thống");
        }
    }
}

module.exports.update = async (req, res) => {
    let check = false;
    if (req.body.data) {
        await Patient.updateOne({_id: req.body.data.id}, req.body.data)
        check = true;
    }

    if (check) {
        res.end("Success");
    }
}

module.exports.delete = async (req, res) => {
    await Patient.findByIdAndDelete(req.query.id);
    res.send("Success");
}

module.exports.createHistory = async (req, res) => {
    const id = req.body.data.id;
    const date = req.body.data.date;
    const doctor = req.body.data.doctor;
    const check = await Patient.findOne({_id: id, "history.date": date, "history.doctor": doctor});

    if(!check) {
        await Patient.updateOne(
            {_id: req.body.data.id},
            {$push: {
                history: {
                    $each: [{date: date, doctor: doctor}],
                    $sort: {date: -1}
                }
            }}
        )
        res.send("Success");
    } else {
        res.send("Bệnh án đã tồn tại trong hệ thống");
    }
}