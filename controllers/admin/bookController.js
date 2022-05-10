const { Op } = require("sequelize")
const { Book, Category } = require("../../models")

class BookController {
  static async index(req, res, next){
    try {
      const { page, limit, title } = req.query
      const categories = {
        model: Category,
        attributes: ["name"]
      }
      let option = {
        include: [categories],
        order: [["title"]]
      }
      if(page){
        option.limit = limit
        option.offset = (page - 1) * limit
      }
      if(title){
        option.where = {
          title: {
            [Op.substring]: title
          }
        }
      }

      const { count, rows } = await Book.findAndCountAll(option)
      const books = rows
      const totalData = count
      res.status(200).json({books, totalData})
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next){
    try {
      const { title, description, imageUrl, author, stock, CategoryId } = req.body
      await Book.create({ title, description, imageUrl, author, stock, CategoryId })
      res.status(201).json({message: "Book has been added"})
    } catch (error) {
      next(error)
    }
  }

  static async show(req, res, next){
    try {
      const { bookId } = req.params
      const book = await Book.findByPk(bookId)
      res.status(200).json({book})
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next){
    try {
      const id = req.params.bookId
      const { title, description, imageUrl, author, stock, CategoryId } = req.body
      const option = {where:{id}}
      await Book.update({ title, description, imageUrl, author, stock, CategoryId }, option)
      res.status(200).json({message: "Book has been updated"})
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next){
    try {
      const { bookId } = req.params
      const result = await Book.destroy({where: {id: bookId}})
      res.status(200).json({message: "Book has been deleted"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookController