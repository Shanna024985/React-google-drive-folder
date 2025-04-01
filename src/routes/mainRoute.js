const expressRouter = require("express").Router();
let controllerForTest = require("./testRouter")
let authRouter = require("./authRequest")
let driveRouter = require("./driveRouter");
expressRouter.use("/testing", controllerForTest)
expressRouter.use("/auth",authRouter);
expressRouter.use("/drive",driveRouter)
module.exports = expressRouter;