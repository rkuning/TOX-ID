const { voucher } = require("../../models");

class VoucherController {
  static async getVouchers(req, res) {
    try {
      const dataVouchers = await voucher.findAll({ attributes: ["id", "code", "value", "is_valid"] });
      res.status(200).json(dataVouchers);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { value } = req.body;
      const code = (Math.random() + 1).toString(36).substring(3).toUpperCase();
      const dataVoucher = await voucher.create({ code, value });
      res.status(201).json({ dataVoucher, msg: `Generate voucher successfully!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { is_valid } = req.body;
      const resUp = await voucher.update({ is_valid }, { where: { id } });
      resUp[0] === 1
        ? res.status(200).json({ msg: `Update successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const resDel = await voucher.destroy({ where: { id } });
      resDel === 1
        ? res.status(200).json({ msg: `Delete successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOneVoucher(req, res) {
    try {
      const id = +req.params.id;
      const dataVoucher = await voucher.findByPk(id);
      dataVoucher ? res.status(200).json(dataVoucher) : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = VoucherController;
