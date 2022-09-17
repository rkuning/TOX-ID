"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      patty.belongsTo(models.user, {
        as: "patty's user",
        foreignKey: "userId",
      });
    }
  }
  patty.init(
    {
      balance: {
        type: DataTypes.BIGINT,
        validate: {
          notEmpty: {
            message: "balance required!",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "userId required!",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "patty",
    }
  );
  return patty;
};
