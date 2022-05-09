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
} = require("../helper")
const { signToken } = require("../../helpers/jwt")

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
  } catch (error) {
    console.error(error);
  }
})

const newBook = {
  title: "New Book",
  description: "new book description",
  imageUrl: "https:://source.unsplash.com/300x300?book",
  author: "author",
  stock: 10,
  CategoryId: 1
}

test("Create new book without login must fail", async () => {
  const book = newBook
  const response = await request(app)
    .post(url)
    .send(book)
    .expect(401)
  const data = response.body
  expect(data.message).toBe("Login is required")
})

test("Create new book with admin login", async () => {
  const book = newBook
  const response = await request(app)
    .post(url)
    .send(book)
    .set("access_token", access_token_admin)
    .expect(201)
  const data = response.body
  expect(data.message).toBe("Book has been added")
})

test("Create new book with member login must fail", async () => {
  const book = newBook
  const response = await request(app)
    .post(url)
    .send(book)
    .set("access_token", access_token_member)
    .expect(403)
  const data = response.body
  expect(data.message).toBe("Forbiden access")
})

test("Create new book without title input", async () => {
  const book = {
    description: newBook.description,
    imageUrl: newBook.imageUrl,
    author: newBook.author,
    stock: newBook.stock,
    CategoryId: newBook.CategoryId
  }
  const response = await request(app)
    .post(url)
    .send(book)
    .set("access_token", access_token_admin)
    .expect(400)
  const data = response.body
  expect(data.message).toBe("Title is required")
})

test("Create new book without Category input", async () => {
  const book = {
    title:  newBook.title,
    description: newBook.description,
    imageUrl: newBook.imageUrl,
    author: newBook.author,
    stock: newBook.stock
  }
  const response = await request(app)
    .post(url)
    .send(book)
    .set("access_token", access_token_admin)
    .expect(400)
  const data = response.body
  expect(data.message).toBe("Category is required")
})

test("Create new book with only title and category input", async () => {
  const book = {
    title:  newBook.title,
    CategoryId: newBook.CategoryId
  }
  const response = await request(app)
    .post(url)
    .send(book)
    .set("access_token", access_token_admin)
    .expect(201)
  const data = response.body
  expect(data.message).toBe("Book has been added")
})