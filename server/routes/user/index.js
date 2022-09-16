const userRoute = require("express").Router();
const { UsersController } = require("../../controllers");

userRoute.get("/", UsersController.usersHome); //get array movie general
userRoute.get("/detail/:id", UsersController.detailMovie); //get detail movie
userRoute.post("/profile", UsersController.profile); //get profile user
userRoute.put("/profile", UsersController.updProfile); //get profile user
userRoute.post("/redeem", UsersController.redeem); //post redeem code
userRoute.post("/ticket", UsersController.ticket); //untuk pesan tiket
userRoute.post("/findseats", UsersController.findSeats); //mencari kursi yang tersedia
userRoute.post("/record", UsersController.record); //get all ticket

module.exports = userRoute;
