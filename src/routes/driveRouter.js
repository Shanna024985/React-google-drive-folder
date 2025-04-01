let express = require("express").Router();
let controller = require("../controller/driveController");

express.post("/",controller.folderCreation)

module.exports = express