const { 
  request,
  app,
  truncateUsersTable,
  seedUsersTable,
  adminUser,
  memberUser,
  truncateBooksTable,
  truncateCategoriesTable,
  seedCategoriesTable,
  seedBooksTable,
} = require("../helper")
const { signToken } = require("../../helpers/jwt")

const url = "/admin/books"

beforeAll(async () => {
  try {
    await truncateBooksTable()
    await truncateCategoriesTable()
    await truncateUsersTable()
    await seedUsersTable()
    await seedCategoriesTable()
    await seedBooksTable()
  } catch (error) {
    console.error(error);
  }
})

const access_token_admin = signToken({email: adminUser.email})
const access_token_member = signToken({email: memberUser.email})

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
  expect(data.books.length).toBe(11)
  expect(data.totalData).toBe(11)
})