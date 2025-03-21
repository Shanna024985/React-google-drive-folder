let express = require("express")
let router = express.Router();
let controller = require("../controller/authController")
router.post("/",controller.generateOauthWebSite)
module.exports = router