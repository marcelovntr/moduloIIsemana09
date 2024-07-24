'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.addColumn('petz', 'peso', {
  allowNull: false,
  type: Sequelize.FLOAT
})
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.removeColumn('petz', 'peso');
     
  }
};
