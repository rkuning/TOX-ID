"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no_seat: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("seats");
  },
};
