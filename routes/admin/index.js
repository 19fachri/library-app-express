const authRouth = require('./authRoutes')
const bookRoutes = require('./bookRoutes')
const adminRoutes = require('express').Router()

adminRoutes.use("/", authRouth)
adminRoutes.use("/books", bookRoutes)

module.exports = adminRoutes