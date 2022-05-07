const AuthController = require("../controllers/AuthController")

const authRouth = require("express").Router()

authRouth
  .post("/register", AuthController.register)
  .post("/login", AuthController.login)

module.exports = authRouth