const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        name: String,
        status: String,
        availability: String,
        history: [{
            date: Date,
            info: String
        }]
    },
    {
        timestamps: true,
    }
);

const Device = mongoose.model("Device", deviceSchema, "devices");

module.exports = Device;