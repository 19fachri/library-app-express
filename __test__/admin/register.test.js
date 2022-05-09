const { 
  request,
  app,
  truncateUsersTable, 
  seedUsersTable, 
  adminUser
} = require("../helper")

const url = "/admin/register"
const newUser = {
  username: "new user",
  email: "newuser@mail.com",
  password: "password"
}
const registeredUser = adminUser

beforeAll( async () => {
  try {
    await truncateUsersTable()
    await seedUsersTable()
  } catch (error) {
    console.log(error);
  }
})

test("Register new user with valid input", async () => {
  const user = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(201)
  const data = response.body
  expect(data.access_token).toBeDefined()
  expect(data.user).toBeDefined()
  expect(data.user.username).toBeDefined()
  expect(data.user.email).toBeDefined()
  expect(data.user.role).toBeDefined()
})

test("Register with no username", async () => {
  const user = {
    email: newUser.email,
    password: newUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Username is required")
})

test("Register with no email", async () => {
  const user = {
    username: newUser.username,
    password: newUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email is required")
})

test("Register with no password", async () => {
  const user = {
    username: newUser.username,
    email: newUser.email
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Password is required")
})

test("Register with invalid email", async () => {
  const user = {
    username: newUser.username,
    email: "invalidEmail",
    password: newUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email must be valid format")
})

test("Register with registered email", async () => {
  const user = registeredUser
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email has been registered")
})

test("Register with empty username", async () => {
  const user = {
    username: "",
    email: newUser.email,
    password: newUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Username is required")
})

test("Register with empty email", async () => {
  const user = {
    username: newUser.username,
    email: "",
    password: newUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Email is required")
})

test("Register with empty password", async () => {
  const user = {
    username: newUser.username,
    email: newUser.email,
    password: ""
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(400)
  const data = response.body
  expect(data.message).toBeDefined()
  expect(data.message).toBe("Password is required")
})