"use strict";
const { Model } = require("sequelize");
const { encryptPw } = require("../helpers/bcyrpt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.patty, {
        as: "patty's user",
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      user.hasOne(models.provider, {
        as: "provider's user",
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "name required!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "adress required!",
          },
          isEmail: {
            message: "email invalid format!",
          },
        },
      },
      level: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "level required!",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "status required!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "password required!",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = encryptPw(user.password);
          user.level = "user";
          user.status = "active";
        },
      },
      sequelize,
      timestamps: false,
      modelName: "user",
    }
  );
  return user;
};
