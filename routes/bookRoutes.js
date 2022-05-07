const bookRoutes = require("express").Router()
const BookController = require("../controllers/bookController")
const isAdmin = require("../middlewares/isAdmin")
const isAuthenticate = require("../middlewares/isAuthenticate")

bookRoutes.use(isAuthenticate)
bookRoutes.use(isAdmin)

bookRoutes
  .post("/", BookController.create)

module.exports = bookRoutes