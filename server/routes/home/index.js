const homeRoute = require("express").Router();
const { HomeController } = require("../../controllers");

homeRoute.get("/", HomeController.showMovies);
homeRoute.get("/detail/:id", HomeController.detailMovie);
homeRoute.post("/login", HomeController.login);
homeRoute.post("/register", HomeController.register);

module.exports = homeRoute;
