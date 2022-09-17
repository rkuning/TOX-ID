"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movie.hasMany(models.movie_in_provider, {
        as: "provider's movie",
        foreignKey: "movieId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  movie.init(
    {
      imdbId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "imdbId required!",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "title required!",
          },
        },
      },
      year: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "year required!",
          },
        },
      },
      rated: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "rated required!",
          },
        },
      },
      released: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "released required!",
          },
        },
      },
      runtime: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "runtime required!",
          },
        },
      },
      genre: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "genre required!",
          },
        },
      },
      director: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "director required!",
          },
        },
      },
      writer: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "writer required!",
          },
        },
      },
      actor: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "actor required!",
          },
        },
      },
      plot: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            message: "plot required!",
          },
        },
      },
      language: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "language required!",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "country required!",
          },
        },
      },
      award: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "award required!",
          },
        },
      },
      poster: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "poster required!",
          },
        },
      },
      rating: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "rating required!",
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
    },
    {
      sequelize,
      timestamps: false,
      modelName: "movie",
    }
  );
  return movie;
};
