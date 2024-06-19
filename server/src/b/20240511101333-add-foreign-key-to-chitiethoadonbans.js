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
    await queryInterface.addConstraint('ChiTietHoaDonBans', {
      fields: ['MaHoaDonBan'],
      type: 'foreign key',
      name: 'cthdb_hdb_FK',
      references: {
          table: 'HoaDonBans',
          field: 'id',
      },
    });

    await queryInterface.addConstraint('ChiTietHoaDonBans', {
      fields: ['MaSanPham'],
      type: 'foreign key',
      name: 'cthdb_sp_FK',
      references: {
          table: 'SanPhams',
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
    await queryInterface.removeConstraint('ChiTietHoaDonBans', 'cthdb_hdb_FK');
    await queryInterface.removeConstraint('ChiTietHoaDonBans', 'cthdb_sp_FK');
  }
};
