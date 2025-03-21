const expressRouter = require("express").Router();
let controllerForTest = require("./testRouter")
let authRouter = require("./authRequest")
expressRouter.use("/testing", controllerForTest)
expressRouter.use("/auth",authRouter)
module.exports = expressRouter;