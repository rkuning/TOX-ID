const adminRoute = require("express").Router();
const userRoutes = require("./userRoute");
const voucherRoutes = require("./voucherRoute");
const studioRoutes = require("./studioRoute");
const seatRoutes = require("./seatRoute");
const scheduleRoutes = require("./scheduleRoute");
const movieRoutes = require("./movieRoute");

adminRoute.get("/", (req, res) => res.status(200).json({ msg: `Home Page Admin` }));
adminRoute.use("/users", userRoutes);
adminRoute.use("/vouchers", voucherRoutes);
adminRoute.use("/studios", studioRoutes);
adminRoute.use("/seats", seatRoutes);
adminRoute.use("/schedules", scheduleRoutes);
adminRoute.use("/movies", movieRoutes);

module.exports = adminRoute;
