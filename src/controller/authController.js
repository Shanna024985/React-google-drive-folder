const {OAuth2Client} = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();
module.exports.generateOauthWebSite = async (req,res,next) => {
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const redirectUrl = "http://localhost:5173/dashboard"
    const oauth2Client = new OAuth2Client(process.env.CLIENT_ID,process.env.CLIENT_SECRET, redirectUrl)

    const authorizeUrl = oauth2Client.generateAuthUrl({access_type:"offline", scope:["https://www.googleapis.com/auth/docs","https://www.googleapis.com/auth/drive", "openid", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive.appdata"], prompt:"consent"})
    res.json({url: authorizeUrl})
}

module.exports.getGoogleUserData = async (req,res,next) => {
debugger
  const code = "4/"+req.params.code
  try {
    const redirectUrl = "http://localhost:5173/dashboard"
    const oauth2Client = new OAuth2Client(process.env.CLIENT_ID,process.env.CLIENT_SECRET, redirectUrl)
    
    const ressponse = await oauth2Client.getToken(code);
    debugger
    oauth2Client.setCredentials(ressponse.tokens);

    res.status(200).json({token: ressponse.tokens})
  } catch (error) {
    console.error(error)
  }
}

