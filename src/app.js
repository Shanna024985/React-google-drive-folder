const express = require("express");
require("dotenv").config();
let cors = require("cors")
let app = express();
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let mainRoutes = require("./routes/mainRoute");
app.use("/api",mainRoutes);

module.exports = app