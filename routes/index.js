const errorHandler = require('../middlewares/errorHandler')
const authRouth = require('./authRoutes')
const bookRoutes = require('./bookRoutes')
const routes = require('express').Router()

routes.use("/", authRouth)
routes.use("/books", bookRoutes)

routes.use(errorHandler)

module.exports = routes