const { schedule } = require("../../models");

class ScheduleController {
  static async getSchedules(req, res) {
    try {
      const dataSchedules = await schedule.findAll({ attributes: ["id", "time"] });
      res.status(200).json(dataSchedules);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { time } = req.body;
      const dataSchedule = await schedule.create({ time });
      res.status(201).json({ dataSchedule, msg: `Create successfully!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { time } = req.body;
      const resUp = await schedule.update({ time }, { where: { id } });
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
      const resDel = await schedule.destroy({ where: { id } });
      resDel === 1
        ? res.status(200).json({ msg: `Delete successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOneSchedule(req, res) {
    try {
      const id = +req.params.id;
      const dataSchedule = await schedule.findByPk(id);
      dataSchedule ? res.status(200).json(dataSchedule) : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ScheduleController;
