const fs = require('node:fs');
const path = require("path")
let reimbursementPath = path.join(__dirname);



console.log(fs.readdirSync(reimbursementPath))