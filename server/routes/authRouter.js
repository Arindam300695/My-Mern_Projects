const express = require("express");
const { registrationController, loginController } = require("../controllers/authControllers");
const authRouter = express.Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);

module.exports = authRouter;