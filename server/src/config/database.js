const mongoose = require("mongoose")

module.exports.connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://cua:cua@cua.fjefrko.mongodb.net/");
    console.log("Connect Success!");
  } catch (error) {
    console.log("Connect Error!");
  }
}
