//admin side
const UserController = require("./admin/UserController");
const VoucherController = require("./admin/VoucherController");
const StudioController = require("./admin/StudioController");
const SeatController = require("./admin/SeatController");
const ScheduleController = require("./admin/ScheduleController");
const MovieController = require("./admin/MovieController");
const HomeController = require("./home/HomeController");
const UsersController = require("./user/UsersController");

module.exports = {
  UserController,
  VoucherController,
  StudioController,
  SeatController,
  ScheduleController,
  MovieController,
  HomeController,
  UsersController,
};
