"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movie_in_providers", {
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
      price: {
        type: Sequelize.BIGINT,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movie_in_providers");
  },
};
