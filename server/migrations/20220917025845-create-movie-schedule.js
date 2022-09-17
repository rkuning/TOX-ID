"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movie_schedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "movies",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      providerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "providers",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      studioId: {
        type: Sequelize.INTEGER,
        references: {
          model: "studios",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "schedules",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movie_schedules");
  },
};
