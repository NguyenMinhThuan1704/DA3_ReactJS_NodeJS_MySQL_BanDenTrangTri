'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('TaiKhoans', {
      fields: ['MaLoaiTK'],
      type: 'foreign key',
      name: 'tk_ltk_id_FK',
      references: {
          table: 'LoaiTaiKhoans',
          field: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('TaiKhoans', 'tk_ltk_id_FK');
  }
};
