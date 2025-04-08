const { google } = require('googleapis');
const { oauth2Client } = require('./authController');

const fs = require("fs")
const path = require("path")
const drive = google.drive({ version: "v3", auth: oauth2Client })

module.exports.folderCreation = async (req, res, next) => {
    if (req.body.refresh_token === undefined || req.body.url === undefined) {
        res.status(400).json({ message: "refresh_token and/or url is undefined in request body" })
    } else {
        let authObj = require("./authController").oauth2Client
        authObj.setCredentials({ refresh_token: req.body.refresh_token })
        let url = req.body.url
        try {
            let response = await drive.files.create({
                requestBody: {
                    name: "Proposal", 
                    parents: [url.slice(39)],
                    mimeType: 'application/vnd.google-apps.folder'
                }
            })
            let response2 = await drive.files.create({
                requestBody: {
                    name: "Finance and Logistics",
                    parents: [url.slice(39)],
                    mimeType: 'application/vnd.google-apps.folder'

                }
            })
            let response3 = await drive.files.create({
                requestBody: {
                    name: "Forms",
                    parents: [url.slice(39)],
                    mimeType: 'application/vnd.google-apps.folder'

                }
            })
            let response4 = await drive.files.create({
                requestBody: {
                    name: "Publicity",
                    parents: [url.slice(39)],
                    mimeType: 'application/vnd.google-apps.folder'
                }
            })
            res.locals.proposalFolder = response.data
            res.locals.financeFolder = response2.data
            res.locals.authObject = authObj
            console.log(response.data)
            next()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports.addFiles = async (req,res,next) => {
  let proposalPath = path.join(__dirname, "Proposal", "Proposal.docx")
  let proposal = await drive.files.create({
    requestBody: {
        name: "Proposal",
        parents: [res.locals.proposalFolder.id]
    },
    media: {
        body: fs.createReadStream(proposalPath)
    }
  })
  let timelinePath = path.join(__dirname,"Proposal","Event Timeline.docx")
  let timeline = await drive.files.create({
    requestBody: {
        name: "Event Timeline",
        parents: [res.locals.proposalFolder.id]
    },
    media: {
        body: fs.createReadStream(timelinePath)
    }
  })
  let budgetPath = path.join(__dirname,"Finance and Logistics","Budget Form.xlsx")
  let budgetForm = await drive.files.create({
    requestBody: {
        name: "Budget Form",
        parents: [res.locals.financeFolder.id]
    },
    media:{
        body: fs.createReadStream(budgetPath)
    }
  })
  let reimbursementPath = path.join(__dirname, "Finance and Logistics", "Reimbursement Form.xlsx");
  let reimbursementForm = await drive.files.create({
    requestBody: {
        name: "Reimbursemen Form",
        parents: [res.locals.financeFolder.id]
    },
    media:{
        body: fs.createReadStream(reimbursementPath)
    }
  })
  res.status(200).json({message: "Done!"})
}