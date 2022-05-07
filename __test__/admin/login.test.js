const request = require("supertest")
const app = require("../../app")
const { sequelize } = require("../../models")
const { queryInterface } = sequelize
const { hashPassword } = require("../../helpers/bcrypt")

const url = "/admin/login"
const users = [
  {
    username: "user",
    email: "user@mail.com",
    password: hashPassword("password"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "user@mail.com",
    password: "password"
  },
  {
    email: "otheruser@mail.com",
    password: "password"
  },
  {
    email: "user@mail.com",
    password: "invalidpassword"
  }
]

beforeAll( async () => {
  const deleteOption = {
    truncate: true,
    cascade: true,
    restartIdentity: true
  }
  try {
    await queryInterface.bulkDelete("Users", null, deleteOption)
    await queryInterface.bulkInsert("Users", [users[0]])
  } catch (error) {
    console.log(error);
  }
})

test("Login user with valid input", async () => {
  const response = await request(app)
    .post(url)
    .send(users[1])
    .expect(200)
  const data = response.body
  expect(data.access_token).toBeDefined()
  expect(data.user).toBeDefined()
  expect(data.user.username).toBeDefined()
  expect(data.user.email).toBeDefined()
  expect(data.user.role).toBeDefined()
})

test("Login user with invalid email", async () => {
  const response = await request(app)
    .post(url)
    .send(users[2])
    .expect(401)
  const data = response.body
  expect(data.message).toBe("Incorect email or password")
})

test("Login user with invalid password", async () => {
  const response = await request(app)
    .post(url)
    .send(users[3])
    .expect(401)
  const data = response.body
  expect(data.message).toBe("Incorect email or password")
})