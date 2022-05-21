const BookController = require("../../controllers/admin/bookController");
const authRouth = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const adminRoutes = require("express").Router();

adminRoutes.use("/", authRouth);
adminRoutes.use("/books", bookRoutes);
adminRoutes.get("/categories", BookController.getCategories);

module.exports = adminRoutes;
