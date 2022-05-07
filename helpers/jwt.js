const jsonwebtoken = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

module.exports = {
  signToken(payload){
    return jsonwebtoken.sign(payload, SECRET_KEY)
  },
  verifyToken(token){
    return jsonwebtoken.verify(token, SECRET_KEY)
  }
}