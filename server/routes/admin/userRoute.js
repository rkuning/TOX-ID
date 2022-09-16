const userRoute = require("express").Router();
const { UserController } = require("../../controllers");

userRoute.get("/", UserController.getUsers);
userRoute.post("/", UserController.create);
userRoute.put("/:id", UserController.update);
userRoute.delete("/:id", UserController.delete);
userRoute.get("/:id", UserController.getOneUser);

module.exports = userRoute;
