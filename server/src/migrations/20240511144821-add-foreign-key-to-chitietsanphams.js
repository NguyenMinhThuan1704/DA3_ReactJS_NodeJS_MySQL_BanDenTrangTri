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
    await queryInterface.addConstraint('ChiTietSanPhams', {
      fields: ['MaSanPham'],
      type: 'foreign key',
      name: 'ctsp_sp_FK',
      references: {
          table: 'SanPhams',
          field: 'id',
      },
    });

    await queryInterface.addConstraint('ChiTietSanPhams', {
      fields: ['MaNhaPhanPhoi'],
      type: 'foreign key',
      name: 'ctsp_npp_FK',
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
    await queryInterface.removeConstraint('ChiTietSanPhams', 'ctsp_sp_FK');
    await queryInterface.removeConstraint('ChiTietSanPhams', 'ctsp_npp_FK');
  }
};
