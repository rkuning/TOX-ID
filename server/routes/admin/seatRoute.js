const seatRoute = require("express").Router();
const { SeatController } = require("../../controllers");

seatRoute.get("/", SeatController.getSeats);
seatRoute.post("/", SeatController.create);
seatRoute.put("/:id", SeatController.update);
seatRoute.delete("/:id", SeatController.delete);
seatRoute.get("/:id", SeatController.getOneSeat);

module.exports = seatRoute;
