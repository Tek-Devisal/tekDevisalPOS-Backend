const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const keys = require("../keys.json");

app.set("keys", keys.tekdevisalPOS);

const routes = require("../routes/v1/routes");
// const { default: mongoose } = require("mongoose");

//connect to database
const mongoose = require("./database/mongodb")(app.get("keys").db_name);
// mongoose.connect(process.env.DB_URI, () => console.log("Conected"))

// Using CORS
app.use(cors());

//send post requests
app.use(express.json());

//Route middleware
app.use("", routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 3001, () =>
    console.log("Server running on port 3001")
  );
}

module.exports = app;
