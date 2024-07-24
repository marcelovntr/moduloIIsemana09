'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id:{autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nome:{type: Sequelize.STRING(100), allowNull: false},
      email: {type: Sequelize.STRING, allowNull: false, unique: true},
      password_hash:{type: Sequelize.STRING, allowNull: false},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    })
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.dropTable('usuarios');
     
  }
};