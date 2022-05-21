const errorHandler = require("../middlewares/errorHandler");
const adminRoutes = require("./admin");
const routes = require("express").Router();

routes.use("/admin", adminRoutes);

routes.use(errorHandler);

module.exports = routes;
