'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        references:{
          model: 'users',
          key: 'id',
        },
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      workOrganization: {
        type: Sequelize.STRING
      },
      profession: {
        type: Sequelize.STRING
      },
      aboutUser: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userData');
  }
};