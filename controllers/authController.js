const { hashPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")

class AuthController {
  static async register(req, res, next){
    let { username, email, password } = req.body
    try {
      const result = await User.create({username, email, password, role:"admin"})
      const { role } = result
      const access_token = signToken({email})
      const user = { username, email, role }
      res.status(201).json({access_token, user})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController