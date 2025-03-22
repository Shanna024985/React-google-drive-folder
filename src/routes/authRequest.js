let express = require("express")
let router = express.Router();
let controller = require("../controller/authController")
router.get("/4/:code",controller.getGoogleUserData)
router.post("/",controller.generateOauthWebSite)
module.exports = router