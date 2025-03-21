const {OAuth2Client} = require("google-auth-library")
module.exports.generateOauthWebSite = async (req,res,next) => {
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const redirectUrl = "http://localhost:5173/auth"
    const oauth2Client = new OAuth2Client(process.env.CLIENT_ID,CLIENT_SECRET, redirectUrl)
}