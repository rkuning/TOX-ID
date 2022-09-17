"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // inisiasi foreign key userId
      provider.belongsTo(models.user, {
        as: "provider's user",
        foreignKey: "userId",
      });
      // inisiasi primary key provider di beberapa tabel
      provider.hasMany(models.studio, {
        as: "studio's provider",
        foreignKey: "providerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      provider.hasMany(models.movie_in_provider, {
        as: "movie's provider",
        foreignKey: "providerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  provider.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "userId required!",
          },
        },
      },
      adress: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "adress required!",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "phone required!",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "city required!",
          },
        },
      },
      latlong: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "latlong required!",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "provider",
    }
  );
  return provider;
};
