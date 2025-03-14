let app = require("./src/app");
require("dotenv").config();
let port = process.env.PORT
app.listen(port,"0.0.0.0",()=>{
    console.log("App listening to port " + port)
})