const router = require("express").Router();
let controller = require("../controller/testController")

router.get("/", controller.getDatas)

module.exports = router