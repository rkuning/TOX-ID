const studioRoute = require("express").Router();
const { StudioController } = require("../../controllers");

studioRoute.get("/", StudioController.getStudios);
studioRoute.post("/", StudioController.create);
studioRoute.put("/:id", StudioController.update);
studioRoute.delete("/:id", StudioController.delete);
studioRoute.get("/:id", StudioController.getOneStudio);

module.exports = studioRoute;
