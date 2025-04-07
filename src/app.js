const express = require("express");
require("dotenv").config();
let cors = require("cors");
const path = require('path');
let app = express();
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let mainRoutes = require("./routes/mainRoute");
app.use("/api",mainRoutes);

let pathForServingHtmlFile = path.join(__dirname,"../Reacttypescript")
console.log(pathForServingHtmlFile)
app.use("/",express.static(pathForServingHtmlFile))

module.exports = app 