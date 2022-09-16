const scheduleRoute = require("express").Router();
const { ScheduleController } = require("../../controllers");

scheduleRoute.get("/", ScheduleController.getSchedules);
scheduleRoute.post("/", ScheduleController.create);
scheduleRoute.put("/:id", ScheduleController.update);
scheduleRoute.delete("/:id", ScheduleController.delete);
scheduleRoute.get("/:id", ScheduleController.getOneSchedule);

module.exports = scheduleRoute;
