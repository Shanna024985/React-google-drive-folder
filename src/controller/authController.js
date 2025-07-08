const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config(); 
const redirectUrl = "https://google-drive-folder-creation.onrender.com/dashboard"
const oauth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectUrl)
module.exports.generateOauthWebSite = async (req, res, next) => {
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const authorizeUrl = oauth2Client.generateAuthUrl({ access_type: "offline", scope: ["https://www.googleapis.com/auth/docs", "https://www.googleapis.com/auth/drive", "openid", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive.appdata", "https://www.googleapis.com/auth/drive"], prompt: "consent" })
  res.json({ url: authorizeUrl })
}

module.exports.getGoogleUserData = async (req, res, next) => {
  debugger
  const code = "4/" + req.params.code
  try {
    fetch(`https://oauth2.googleapis.com/token?client_secret=${process.env.CLIENT_SECRET}&client_id=${process.env.CLIENT_ID}&grant_type=authorization_code&redirect_uri=https://google-drive-folder-creation.onrender.com/dashboard&code=${code}`, {
      method: "POST"
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        res.status(200).json(value)
      })

  } catch (error) {
    debugger
    console.error(error)
  }
}

module.exports.oauth2Client = oauth2Client