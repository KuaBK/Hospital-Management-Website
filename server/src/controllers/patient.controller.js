const Patient = require("../models/patient.model");

module.exports.index = async (req, res) => {
    const patients = await Patient.find({name: new RegExp(req.query.keyword, "i")})
    res.json(patients)
}

module.exports.detail = async (req, res) => {
    const data = await Patient.findById(req.params.patientID);
    res.json(data);
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

module.exports.delete = async (req, res) => {
    await Patient.findByIdAndDelete(req.query.id);
    res.send("Success");
}