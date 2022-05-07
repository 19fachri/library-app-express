const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if(!access_token) throw { name: "LoginIsRequired" }
    const { email } = verifyToken(access_token)
    const user = await User.findOne({ where: {email} })
    if(!user) throw { name: "LoginIsRequired" }
    req.user = user
    next()
  } catch (error) {
    next(error)    
  }
}