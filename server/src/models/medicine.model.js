const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name: String,
        data: [{
            quantity: Number,
            expire: String
        }]
    },
    {
        timestamps: true,
    }
);

const Medicine = mongoose.model("Medicine", medicineSchema, "medicines");

module.exports = Medicine;