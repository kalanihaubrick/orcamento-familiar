'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('despesas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        allowNull: false,

        type: Sequelize.STRING
      },
      valor: {
        allowNull: false,

        type: Sequelize.DECIMAL
      },
      data: {
        allowNull: false,

        type: Sequelize.DATE
      }, 
      categoria: {
        
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('despesas');
  }
};