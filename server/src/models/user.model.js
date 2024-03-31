const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
    {
        tokenUser: {
            type: String,
            default: generate.generateRandomString(20)
        },
        name: String,
        email: String,
        phone_number: String,
        password: String,
        re_password: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;