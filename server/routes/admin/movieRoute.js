const movieRoute = require("express").Router();
const { MovieController } = require("../../controllers");

movieRoute.get("/", MovieController.getMovies);
movieRoute.post("/", MovieController.create);
movieRoute.put("/:id", MovieController.update);
movieRoute.delete("/:id", MovieController.delete);
movieRoute.get("/:id", MovieController.getOneMovie);
movieRoute.post("/getImdb", MovieController.getImdb);
movieRoute.post("/getImdbSearch", MovieController.getImdbSearch);

module.exports = movieRoute;
