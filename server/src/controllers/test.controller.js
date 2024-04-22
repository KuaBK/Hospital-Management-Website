const Test = require("../models/test.model");
const Employee = require('../models/employee.model');
const { ObjectId } = require("mongodb");

module.exports.index = async (req, res) => {
    const patientID = req.query.patientID;
    const tests = await Test.find({patientID: patientID}).sort({ date: -1 });
    res.json(tests);
}

module.exports.create = async (req, res) => {
    const patientID = req.body.data.patientID;
    const date = req.body.data.date;
    const data = req.body.data.data;

    data["_id"] = new ObjectId();

    if (await Test.findOne({patientID: patientID, date: date})) {
        await Test.updateOne({patientID: patientID, date: date}, {
            $push: {
                data: data
            }
        })
        res.send("Success");
    } else {
        const test = new Test({patientID: patientID, date: date, data: [data]});
        await test.save();
        res.end("Success");
    }
}

module.exports.update = async (req, res) => {
    const patientID = req.body.data.patientID;
    const updateData = req.body.data.updateData;
    const newName = req.body.data.name;
    const newResult = req.body.data.result;

    if (newName === updateData.name) {
        res.end("Vui lòng chọn xét nghiệm khác");
    } else {
        if(await Test.findOne({patientID: patientID, data: {$elemMatch: {name: newName}}})) {
            res.end("Kết quả xét nghiệm đã tồn tại");
        } else {
            await Test.findOneAndUpdate({patientID: patientID, data: {$elemMatch: {_id: updateData._id}}}, {
                $set: {
                    "data.$.name": newName,
                    "data.$.result": newResult
                }
            }) 
            res.end("Success");
        }
    }
}

module.exports.delete = async (req, res) => {
    const patientID = req.body.patientID;
    const deleteID = req.body.deleteID;

    if ((await Test.findOne({patientID: patientID})).data.length === 1) {
        await Test.deleteOne({patientID: patientID});
        res.end("Success");
    } else {
        await Test.findOneAndUpdate({patientID: patientID}, {
            $pull: {
                data: {_id: deleteID}
            }
        });
        res.end("Success");
    }
}