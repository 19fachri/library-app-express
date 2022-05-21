const AuthController = require("../../controllers/admin/authController");

const authRouth = require("express").Router();

authRouth
  .post("/register", AuthController.register)
  .post("/login", AuthController.login)
  .post("/google-login", AuthController.googleLogin);

module.exports = authRouth;
