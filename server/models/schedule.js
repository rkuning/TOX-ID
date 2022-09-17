"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schedule.init(
    {
      time: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "time required!",
          },
        },
      },
      studioId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "studioId required!",
          },
        },
      },
      providerId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "providerId required!",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "schedule",
    }
  );
  return schedule;
};
