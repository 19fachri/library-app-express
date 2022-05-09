const { Book } = require("../models")
module.exports = async (req, res, next) => {
  try {
    const { bookId } = req.params
    const book = await Book.findByPk(bookId)
    if(!book) throw { name: "DataNotFound" }
    next()
  } catch (error) {
    next(error)
  }
}