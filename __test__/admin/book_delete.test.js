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
} = require("../helper")
const { signToken } = require("../../helpers/jwt")

const url = "/admin/books"
const access_token_admin = signToken({email: adminUser.email})
const access_token_member = signToken({email: memberUser.email})
// const access_token_admin = signToken({email: adminUser.email})
// const access_token_member = signToken({email: memberUser.email})

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

test("Delete book without login must be fail", async () => {
  const bookId = 1
  const { body } = await request(app)
    .delete(url + "/" + bookId)
    .expect(401)
  expect(body.message).toBe("Login is required")
})

test("Delete book with admin login must be seccess", async () => {
  const bookId = 2
  const { body } = await request(app)
    .delete(url + "/" + bookId)
    .set("access_token", access_token_admin)
    .expect(200)
  expect(body.message).toBe("Book has been deleted")
})

test("Delete book with member login must be fail", async () => {
  const bookId = 3
  const { body } = await request(app)
    .delete(url + "/" + bookId)
    .set("access_token", access_token_member)
    .expect(403)
  expect(body.message).toBe("Forbiden access")
})

test("Delete book with invalid id", async () => {
  const bookId = 100
  const { body } = await request(app)
    .delete(url + "/" + bookId)
    .set("access_token", access_token_admin)
    .expect(404)
  expect(body.message).toBe("Data not found")
})