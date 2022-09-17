"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie_in_provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movie_in_provider.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "movidId required!",
          },
        },
      },
      price: {
        type: DataTypes.BIGINT,
        validate: {
          notEmpty: {
            message: "price required!",
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
      modelName: "movie_in_provider",
    }
  );
  return movie_in_provider;
};
