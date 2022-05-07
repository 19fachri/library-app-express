const bcryptjs = require("bcryptjs")

module.exports = {
  hashPassword(password){
    return bcryptjs.hashSync(password)
  },
  comparePassword(password, hash){
    return bcryptjs.compareSync(password, hash)
  }
}