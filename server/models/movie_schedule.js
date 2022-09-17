"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movie_schedule.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "movieId required!",
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
      studioId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "studioId required!",
          },
        },
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "scheduleId required!",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "movie_schedule",
    }
  );
  return movie_schedule;
};
