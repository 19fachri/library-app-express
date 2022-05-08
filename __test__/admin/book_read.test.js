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

beforeAll(async () => {
  try {
    const deleteOption = {
      truncate: true,
      cascade: true,
      restartIdentity: true
    }
    await queryInterface.bulkDelete("Books", null, deleteOption)
    await queryInterface.bulkDelete("Categories", null, deleteOption)
    await queryInterface.bulkDelete("Users", null, deleteOption)
    await queryInterface.bulkInsert("Users", users)
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Horor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Comedy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Romans",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    await queryInterface.bulkInsert("Books", [
      {
        title: "Book 0",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 1",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 2",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 3",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 4",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 5",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 6",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 7",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 8",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 9",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 10",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 11",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 12",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 13",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 14",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 15",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 16",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 17",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 18",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Book 19",
        description: "book description",
        imageUrl: "https:://source.unsplash.com/300x300?book",
        author: "author",
        stock: 10,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  } catch (error) {
    console.error(error);
  }
})

const access_token_admin = signToken({email: users[0].email})
const access_token_member = signToken({email: users[1].email})

test("Read all book without login must be fail", async () => {
  const response = await request(app)
    .get(url)
    .expect(401)
  const data = response.body
  expect(data.message).toBe("Login is required")
})

test("Read all book with admin login", async () => {
  const response = await request(app)
    .get(url)
    .set("access_token", access_token_admin)
    .expect(200)
  const data = response.body
  expect(data.books.length).toBe(20)
  expect(data.totalData).toBe(20)
})

test("Read all book with member login must be fail", async () => {
  const response = await request(app)
    .get(url)
    .set("access_token", access_token_member)
    .expect(403)
  const data = response.body
  expect(data.message).toBe("Forbiden access")
})

test("Read all book with pagination", async () => {
  const page = 1
  const limit = 5
  const response = await request(app)
    .get(url + "?page=" + page + "&limit=" + limit)
    .set("access_token", access_token_admin)
    .expect(200)
  const data = response.body
  expect(data.books.length).toBe(5)
  expect(data.totalData).toBe(20)
})

test("Read all book with title filter", async () => {
  const title = "1"
  const response = await request(app)
    .get(url + "?title=" + title)
    .set("access_token", access_token_admin)
    .expect(200)
  const data = response.body
  expect(data.books.length).toBe(10)
  expect(data.totalData).toBe(11)
})