const route = require("express").Router();
const adminRoutes = require("./admin");
const userRoutes = require("./user");
const homeRoutes = require("./home");

route.use("/", homeRoutes);
route.use("/admin", adminRoutes);
route.use("/users", userRoutes);

module.exports = route;
