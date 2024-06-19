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
    await queryInterface.addConstraint('HoaDonBans', {
      fields: ['MaKH'],
      type: 'foreign key',
      name: 'hdb_kh_FK',
      references: {
          table: 'KhachHangs',
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
    await queryInterface.removeConstraint('HoaDonBans', 'hdb_kh_FK');
  }
};
