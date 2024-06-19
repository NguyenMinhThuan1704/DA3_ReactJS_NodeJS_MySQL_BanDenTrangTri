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
    await queryInterface.addConstraint('HoaDonNhaps', {
      fields: ['MaTaiKhoan'],
      type: 'foreign key',
      name: 'hdn_tk_FK',
      references: {
          table: 'TaiKhoans',
          field: 'id',
      },
    });

    await queryInterface.addConstraint('HoaDonNhaps', {
      fields: ['MaNhaPhanPhoi'],
      type: 'foreign key',
      name: 'hdn_npp_FK',
      references: {
          table: 'NhaPhanPhois',
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
    await queryInterface.removeConstraint('HoaDonNhaps', 'hdn_tk_FK');
    await queryInterface.removeConstraint('HoaDonNhaps', 'hdn_npp_FK');
  }
};
