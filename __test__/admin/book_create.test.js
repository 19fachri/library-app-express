const request = require("supertest")
const app = require("../../app")
const { hashPassword } = require("../../helpers/bcrypt")
const { signToken } = require("../../helpers/jwt")
const { sequelize } = require("../../models")
const { queryInterface } = sequelize

const url = "/admin/books"
const users = [
  {
    username: "admin",
    email: "admin@mail.com",
    password: hashPassword("password"),
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "member",
    email: "member@mail.com",
    password: hashPassword("password"),
    role: "member",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const categories = [
  {
    name: "Horror",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

beforeAll( async () => {
  const deleteOption = {
    truncate: true,
    cascade: true,
    restartIdentity: true
  }
  try {
    await queryInterface.bulkDelete("Books", null, deleteOption)
    await queryInterface.bulkDelete("Categories", null, deleteOption)
    await queryInterface.bulkDelete("Users", null, deleteOption)
    await queryInterface.bulkInsert("Users", users)
    await queryInterface.bulkInsert("Categories", categories)
  } catch (error) {
    console.error(error);
  }
})

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
    stock: 10
  },
  {
    title: "Book 3",
    CategoryId: 1
  },
  {
    title: "Book 4",
    description: "book description",
    imageUrl: "https:://source.unsplash.com/300x300?book",
    author: "author",
    stock: 10,
    CategoryId: 10
  }
]

const access_token_admin = signToken({email: users[0].email})
const access_token_member = signToken({email: users[1].email})

test("Create new book without login must fail", async () => {
  const response = await request(app)
    .post(url)
    .send(books[0])
    .expect(401)
  const data = response.body
  expect(data.message).toBe("Login is required")
})

test("Create new book with admin login", async () => {
  const response = await request(app)
    .post(url)
    .send(books[0])
    .set("access_token", access_token_admin)
    .expect(201)
  const data = response.body
  expect(data.message).toBe("Book has been added")
})

test("Create new book with member login must fail", async () => {
  const response = await request(app)
    .post(url)
    .send(books[0])
    .set("access_token", access_token_member)
    .expect(403)
  const data = response.body
  expect(data.message).toBe("Forbiden access")
})

test("Create new book without title input", async () => {
  const response = await request(app)
    .post(url)
    .send(books[1])
    .set("access_token", access_token_admin)
    .expect(400)
  const data = response.body
  expect(data.message).toBe("Title is required")
})

test("Create new book without Category input", async () => {
  const response = await request(app)
    .post(url)
    .send(books[2])
    .set("access_token", access_token_admin)
    .expect(400)
  const data = response.body
  expect(data.message).toBe("Category is required")
})

test("Create new book with only title and category input", async () => {
  const response = await request(app)
    .post(url)
    .send(books[3])
    .set("access_token", access_token_admin)
    .expect(201)
  const data = response.body
  expect(data.message).toBe("Book has been added")
})