const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const historySchema = new mongoose.Schema(
    {
        patientID: ObjectId,
        date: Date,
        doctor: [Object]
    },
    {
        timestamps: true,
    }
);

const History = mongoose.model("History", historySchema, "histories");

module.exports = History;