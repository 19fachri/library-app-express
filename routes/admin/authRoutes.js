const AuthController = require("../../controllers/admin/authController")

const authRouth = require("express").Router()

authRouth
  .post("/register", AuthController.register)
  .post("/login", AuthController.login)

module.exports = authRouth