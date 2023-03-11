'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origem: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "cities",
          },
          key: "id",
        },
      },
      destiny: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "cities",
          },
          key: "id",
        },
      },
      departure_time: {
        type: Sequelize.TIME
      },
      arrive_time: {
        type: Sequelize.TIME
      },
      value: {
        type: Sequelize.DECIMAL
      },
      km: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      router_id: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('routes');
  }
};