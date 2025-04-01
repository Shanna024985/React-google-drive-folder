const { google } = require('googleapis');
const { oauth2Client } = require('./authController');

const fs = require("fs")
const path = require("path")
let pathToAdd = path.join(__dirname, "ADS_Expense_Form (1).docx")

module.exports.folderCreation = async (req, res, next) => {
    if (req.body.refresh_token === undefined || req.body.url === undefined) {
        res.status(400).json({ message: "refresh_token and/or url is undefined in request body" })
    } else {
        let authObj = require("./authController").oauth2Client
        authObj.setCredentials({ refresh_token: req.body.refresh_token })
        const drive = google.drive({ version: "v3", auth: oauth2Client })
        let url = req.body.url
        try {
            let response = await drive.files.create({
                requestBody: {
                    name: "ADS_Expense_Form (1).docx", 
                    parents: [url.slice(39)]
                },
                media: {
                    body: fs.createReadStream(pathToAdd),
                }
            })
            console.log(response.data)
            res.status(200).json(response.data)
        } catch (error) {
            res.status(500).json(error)
        }

    }


}