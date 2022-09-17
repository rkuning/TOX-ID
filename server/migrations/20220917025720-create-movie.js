"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      imdbId: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
      rated: {
        type: Sequelize.STRING,
      },
      released: {
        type: Sequelize.STRING,
      },
      runtime: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      writer: {
        type: Sequelize.STRING,
      },
      actor: {
        type: Sequelize.STRING,
      },
      plot: {
        type: Sequelize.TEXT,
      },
      language: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      award: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movies");
  },
};
