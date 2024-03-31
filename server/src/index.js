const express = require("express");
const database = require("./config/database");
const routeClient = require("./routes/index.route");

require('dotenv').config();

database.connect();

const app = express();

routeClient(app);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});