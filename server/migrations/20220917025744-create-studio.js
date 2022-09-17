"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("studios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("studios");
  },
};
