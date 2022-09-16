const { user, patty } = require("../../models");

class UserController {
  static async getUsers(req, res) {
    try {
      const dataUsers = await user.findAll({ attributes: ["id", "name", "phone", "level", "status", "password"] });
      res.status(200).json(dataUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name, phone, password } = req.body;
      const valPhone = await user.findOne({ where: { phone } });
      if (valPhone) {
        res.status(302).json({ msg: `Phone already registered!` });
      } else {
        const dataUser = await user.create({ name, phone, password });
        await patty.create({ userId: dataUser.id });
        res.status(201).json({ dataUser, msg: `Create successfully!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { level, status } = req.body;
      const resUp = await user.update({ level, status }, { where: { id } });
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
      const resDel = await user.destroy({ where: { id } });
      resDel === 1
        ? res.status(200).json({ msg: `Delete successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOneUser(req, res) {
    try {
      const id = +req.params.id;
      const dataUser = await user.findByPk(id);
      dataUser ? res.status(200).json(dataUser) : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
