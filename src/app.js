const express = require("express");
require("dotenv").config();
let cors = require("cors");
const path = require('path');
let app = express();
app.use(cors({
    origin: ["https://google-drive-folder-creation.onrender.com","http://localhost:5173"]
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let mainRoutes = require("./routes/mainRoute");
app.use("/api",mainRoutes);

let pathForServingHtmlFile = path.join(__dirname,"../Reacttypescript","dist")
console.log(pathForServingHtmlFile)
app.use("/",express.static(pathForServingHtmlFile))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"../Reacttypescript","dist","index.html"));
});
  

module.exports = app 