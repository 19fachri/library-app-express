const { User } = require("../models")

module.exports = async (req, res, next) => {
  try {
    const isNotAdmin = req.user.role !== "admin"
    if(isNotAdmin) throw { name: "ForbidenAccess" }
    next()
  } catch (error) {
    next(error)
  }
}