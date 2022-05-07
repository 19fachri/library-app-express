const { Book } = require("../../models")

class BookController {
  static async create(req, res, next){
    try {
      const { title, description, imageUrl, author, stock, CategoryId } = req.body
      await Book.create({ title, description, imageUrl, author, stock, CategoryId })
      res.status(201).json({message: "Book has been added"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookController