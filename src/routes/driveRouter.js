let express = require("express").Router();
let controller = require("../controller/driveController");

express.post("/",controller.folderCreation, controller.addFiles)

module.exports = express