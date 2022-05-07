const errorHandler = require('../middlewares/errorHandler')
const authRouth = require('./authRoutes')
const routes = require('express').Router()

routes.use("/", authRouth)

routes.use(errorHandler)

module.exports = routes