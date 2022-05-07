const { comparePassword } = require("../helpers/bcrypt")
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

  static async login(req, res, next){
    let { email, password } = req. body
    try {
      const result = await User.findOne({ where: {email} })
      if(!result) throw { name: "IncorectEmailOrPassword" }
      const isValidPassword = comparePassword(password, result.password)
      if(!isValidPassword) throw { name: "IncorectEmailOrPassword" }
      const { username, role } = result
      const access_token = signToken({email})
      const user = { username, email, role }
      res.status(200).json({access_token, user})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController