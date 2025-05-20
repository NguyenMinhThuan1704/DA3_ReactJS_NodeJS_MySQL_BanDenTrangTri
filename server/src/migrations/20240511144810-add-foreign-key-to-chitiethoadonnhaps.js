"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addConstraint("ChiTietHoaDonNhaps", {
    //   fields: ["MaHoaDonNhap"],
    //   type: "foreign key",
    //   name: "cthdn_hdn_FK",
    //   references: {
    //     table: "HoaDonNhaps",
    //     field: "id",
    //   },
    // });
    // await queryInterface.addConstraint("ChiTietHoaDonNhaps", {
    //   fields: ["MaSanPham"],
    //   type: "foreign key",
    //   name: "cthdn_sp_FK",
    //   references: {
    //     table: "SanPhams",
    //     field: "id",
    //   },
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeConstraint("ChiTietHoaDonNhaps", "cthdn_hdn_FK");
    // await queryInterface.removeConstraint("ChiTietHoaDonNhaps", "cthdn_sp_FK");
  },
};
