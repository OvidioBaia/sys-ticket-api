'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      costumer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "costumers",
          },
          key: "id",
        },
      },
      router_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "routes",
          },
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};