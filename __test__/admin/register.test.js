const request = require("supertest")
const app = require("../../app")
const { sequelize } = require("../../models")
const { queryInterface } = sequelize
const { hashPassword } = require("../../helpers/bcrypt")

const url = "/admin/register"
const users = [
  {
    username: "user0",
    email: "user0@mail.com",
    password: hashPassword("password"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "user1",
    email: "user1@mail.com",
    password: "password"
  },
  {
    email: "user2@mail.com",
    password: "password"
  },
  {
    username: "user3",
    password: "password"
  },
  {
    username: "user4",
    email: "user4@mail.com",
  },
  {
    username: "user5",
    email: "invalid email",
    password: "password"
  },
  {
    username: "",
    email: "user6@mail.com",
    password: "password"
  },
  {
    username: "user7",
    email: "",
    password: "password"
  },
  {
    username: "user8",
    email: "user8@mail.com",
    password: ""
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

test("Register new user with valid input", async () => {
  const response = await request(app)
    .post(url)
    .send(users[1])
    .expect(201)
  const data = response.body
  expect(data.access_token).toBeDefined()
  expect(data.user).toBeDefined()
  expect(data.user.username).toBeDefined()
  expect(data.user.email).toBeDefined()
  expect(data.user.role).toBeDefined()
})

test("Register with no username", async () => {
  const response = await request(app)
    .post(url)
    .send(users[2])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Username is required")
})

test("Register with no email", async () => {
  const response = await request(app)
    .post(url)
    .send(users[3])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email is required")
})

test("Register with no password", async () => {
  const response = await request(app)
    .post(url)
    .send(users[4])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Password is required")
})

test("Register with invalid email", async () => {
  const response = await request(app)
    .post(url)
    .send(users[5])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email must be valid format")
})

test("Register with registered email", async () => {
  const response = await request(app)
    .post(url)
    .send(users[0])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email has been registered")
})

test("Register with empty username", async () => {
  const response = await request(app)
    .post(url)
    .send(users[6])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Username is required")
})

test("Register with empty email", async () => {
  const response = await request(app)
    .post(url)
    .send(users[7])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email is required")
})

test("Register with empty password", async () => {
  const response = await request(app)
    .post(url)
    .send(users[8])
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Password is required")
})