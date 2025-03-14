const express = require("express");
require("dotenv").config();
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let mainRoutes = require("./routes/mainRoute");
app.use("/api",mainRoutes);