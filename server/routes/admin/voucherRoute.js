const voucherRoute = require("express").Router();
const { VoucherController } = require("../../controllers");

voucherRoute.get("/", VoucherController.getVouchers);
voucherRoute.post("/", VoucherController.create);
voucherRoute.put("/:id", VoucherController.update);
voucherRoute.delete("/:id", VoucherController.delete);
voucherRoute.get("/:id", VoucherController.getOneVoucher);

module.exports = voucherRoute;
