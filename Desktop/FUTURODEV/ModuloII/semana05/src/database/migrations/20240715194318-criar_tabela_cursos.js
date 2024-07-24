'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable('cursos', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER

  },
  nome: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  duracao:{
    allowNull: false,
    type: Sequelize.INTEGER
  },
  createdAt: {allowNull: false, type: Sequelize.DATE},
   updatedAt: {allowNull: false, type: Sequelize.DATE},
   deletedAt: {type: Sequelize.DATE}
})
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('cursos');
     
  }
};
