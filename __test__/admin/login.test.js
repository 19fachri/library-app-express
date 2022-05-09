const { 
  request,
  app,
  truncateUsersTable,
  seedUsersTable,
  adminUser
} = require("../helper")

const url = "/admin/login"
const registeredUser = adminUser

beforeAll( async () => {
  try {
    await truncateUsersTable()
    await seedUsersTable()
  } catch (error) {
    console.log(error);
  }
})

test("Login user with valid input", async () => {
  const user = {
    email: registeredUser.email,
    password: registeredUser.password
  }
  const response = await request(app)
    .post(url)
    .send(user)
    .expect(200)
  const data = response.body
  console.log(data);
  expect(data.access_token).toBeDefined()
  expect(data.user).toBeDefined()
  expect(data.user.username).toBeDefined()
  expect(data.user.email).toBeDefined()
  expect(data.user.role).toBeDefined()
})

// test("Login user with invalid email", async () => {
//   const user = {
//     email: "invalid@mail.com",
//     password: registeredUser.password
//   }
//   const response = await request(app)
//     .post(url)
//     .send(user)
//     .expect(401)
//   const data = response.body
//   expect(data.message).toBe("Incorect email or password")
// })

// test("Login user with invalid password", async () => {
//   const user = {
//     email: registeredUser.email,
//     password: "invalidPassword"
//   }
//   const response = await request(app)
//     .post(url)
//     .send(user)
//     .expect(401)
//   const data = response.body
//   expect(data.message).toBe("Incorect email or password")
// })