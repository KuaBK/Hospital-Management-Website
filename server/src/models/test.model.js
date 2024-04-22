const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const testSchema = new mongoose.Schema(
    {
        patientID: ObjectId,
        date: Date,
        data: [{
            _id: ObjectId,
            name: String,
            result: String
        }]
    },
    {
        timestamps: true,
    }
);

const Test = mongoose.model("Test", testSchema, "tests");

module.exports = Test;