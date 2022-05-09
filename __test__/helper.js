exports.request = require("supertest")
exports.app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
exports.queryInterface
const { hashPassword } = require("../helpers/bcrypt")

const deleteOption = {
  truncate: true,
  cascade: true,
  restartIdentity: true
}
exports.adminUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "password",
  role: "admin"
}
exports.memberUser = {
  username: "member",
  email: "member@mail.com",
  password: "password",
  role: "member"
}
const users = [
  {...this.adminUser},
  {...this.memberUser}
]
const categories = [
  {
    name: "Horor"
  },
  {
    name: "Comedy"
  },
  {
    name: "Romans"
  }
]
const books = [
  {
    title: "Book 0",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 1",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 2",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 3",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 4",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 5",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 6",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 7",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 8",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 9",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 10",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 11",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 12",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 13",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 14",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 15",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 16",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 17",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 18",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  },
  {
    title: "Book 19",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 1
  }
]

exports.truncateUsersTable = () => {
  return queryInterface.bulkDelete("Users", null, deleteOption)
}

exports.truncateCategoriesTable = () => {
  return queryInterface.bulkDelete("Categories", null, deleteOption)
}

exports.truncateBooksTable = () => {
  return queryInterface.bulkDelete("Books", null, deleteOption)
}

exports.seedUsersTable = () => {
  const usersData = users.map(el => {
    el.password = hashPassword(el.password)
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
  })
  return queryInterface.bulkInsert("Users", usersData)
}

exports.seedCategoriesTable = () => {
  const categoriesData = categories.map(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
  })
  return queryInterface.bulkInsert("Categories", categoriesData)
}

exports.seedBooksTable = () => {
  const booksData = books.map(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
  })
  return queryInterface.bulkInsert("Books", booksData)
}