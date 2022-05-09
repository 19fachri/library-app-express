const bookRoutes = require("express").Router()
const BookController = require("../../controllers/admin/bookController")
const isAdmin = require("../../middlewares/isAdmin")
const isAuthenticate = require("../../middlewares/isAuthenticate")
const isBookEksist = require("../../middlewares/isBookEksist")

bookRoutes.use(isAuthenticate)
bookRoutes.use(isAdmin)

bookRoutes
  .get("/", BookController.index)
  .post("/", BookController.create)
  .delete("/:bookId", isBookEksist, BookController.delete)

module.exports = bookRoutes