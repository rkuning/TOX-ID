const { seat } = require("../../models");

class SeatController {
  static async getSeats(req, res) {
    try {
      const dataSeats = await seat.findAll({ attributes: ["id", "no_seat"] });
      res.status(200).json(dataSeats);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { no_seat } = req.body;
      const dataSeat = await seat.create({ no_seat });
      res.status(201).json({ dataSeat, msg: `Create successfully!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { no_seat } = req.body;
      const resUp = await seat.update({ no_seat }, { where: { id } });
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
      const resDel = await seat.destroy({ where: { id } });
      resDel === 1
        ? res.status(200).json({ msg: `Delete successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOneSeat(req, res) {
    try {
      const id = +req.params.id;
      const dataSeat = await seat.findByPk(id);
      dataSeat ? res.status(200).json(dataSeat) : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = SeatController;
