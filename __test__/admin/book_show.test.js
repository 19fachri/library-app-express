const { 
  truncateBooksTable, 
  truncateCategoriesTable, 
  truncateUsersTable, 
  seedUsersTable, 
  seedCategoriesTable, 
  seedBooksTable, 
  request,
  app,
  adminUser,
  memberUser
} = require("../helper");
const { signToken } = require("../../helpers/jwt");

const url = "/admin/books"
const access_token_admin = signToken({email: adminUser.email})
const access_token_member = signToken({email: memberUser.email})

beforeAll( async () => {
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

test("Show book without login must be fail", async () => {
  const bookId = 1
  const { body } = await request(app)
    .get(url + "/" + bookId)
    .expect(401)
  expect(body.message).toBe("Login is required")
})

test("Show book with admin login must be seccess", async () => {
  const bookId = 2
  const { body } = await request(app)
    .get(url + "/" + bookId)
    .set("access_token", access_token_admin)
    .expect(200)
  expect(body.book).toBeDefined()
})

test("Show book with member login must be fail", async () => {
  const bookId = 3
  const { body } = await request(app)
    .get(url + "/" + bookId)
    .set("access_token", access_token_member)
    .expect(403)
  expect(body.message).toBe("Forbiden access")
})

test("Show book with invalid id", async () => {
  const bookId = 100
  const { body } = await request(app)
    .get(url + "/" + bookId)
    .set("access_token", access_token_admin)
    .expect(404)
  expect(body.message).toBe("Data not found")
})