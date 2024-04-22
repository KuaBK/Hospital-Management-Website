const History = require('../models/history.model');
const Employee = require('../models/employee.model');

module.exports.index = async (req, res) => {
    const patientID = req.query.patientID;
    const histories = await History.find({patientID: patientID}).sort({ date: -1 });
    res.json(histories);
}

module.exports.create = async (req, res) => {
    const patientID = req.body.data.patientID;
    const doctorID = req.body.data.doctorID;
    const date = req.body.data.date;
    const doctor = await Employee.findOne({_id: doctorID});

    if (await History.findOne({patientID: patientID, date: date})) {
        await History.updateOne({patientID: patientID, date: date}, {
            $push: {
                doctor: doctor
            }
        })
        res.send("Success");
    } else {
        const history = new History({patientID: patientID, date: date, doctor: [doctor]});
        await history.save();
        res.end("Success");
    }
}

module.exports.update = async (req, res) => {
    const patientID = req.body.data.patientID;
    const newDoctorID = req.body.data.newDoctorID;
    const doctorID = req.body.data.doctorID;

    if (!newDoctorID) {
        res.end("Vui lòng chọn bác sĩ khác");
    } else if (newDoctorID === doctorID) {
        res.end("Vui lòng chọn bác sĩ khác");
    } else {
        const newDoctor = await Employee.findOne({_id: newDoctorID});
        await History.findOneAndUpdate({patientID: patientID, doctor: {$elemMatch: {_id: doctorID}}}, {
            $set: {
                "doctor.$": newDoctor
            }
        });
        res.end("Success");
    }
}

module.exports.delete = async (req, res) => {
    const patientID = req.body.patientData.patientID;
    const doctorID = req.body.doctor._id;

    if ((await History.findOne({patientID: patientID})).doctor.length === 1) {
        await History.deleteOne({patientID: patientID});
        res.end("Success");
    } else {
        const doctor = await Employee.findOne({_id: doctorID});
        await History.findOneAndUpdate({patientID: patientID, doctor: {$elemMatch: {_id: doctorID}}}, {
            $pull: {
                doctor: doctor
            }
        });
        res.end("Success");
    }
}