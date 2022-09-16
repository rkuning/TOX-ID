const { studio } = require("../../models");

class StudioController {
  static async getStudios(req, res) {
    try {
      const dataStudios = await studio.findAll({ attributes: ["id", "name"] });
      res.status(200).json(dataStudios);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body;
      const dataStudio = await studio.create({ name });
      res.status(201).json({ dataStudio, msg: `Create successfully!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name } = req.body;
      const resUp = await studio.update({ name }, { where: { id } });
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
      const resDel = await studio.destroy({ where: { id } });
      resDel === 1
        ? res.status(200).json({ msg: `Delete successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOneStudio(req, res) {
    try {
      const id = +req.params.id;
      const dataStudio = await studio.findByPk(id);
      dataStudio ? res.status(200).json(dataStudio) : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = StudioController;
