"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("providers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      adress: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      latlong: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("providers");
  },
};
