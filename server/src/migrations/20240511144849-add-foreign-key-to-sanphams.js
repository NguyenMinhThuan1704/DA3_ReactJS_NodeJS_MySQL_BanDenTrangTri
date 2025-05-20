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
    // await queryInterface.addConstraint("SanPhams", {
    //   fields: ["MaLoaiSanPham"],
    //   type: "foreign key",
    //   name: "sp_lsp_id_FK",
    //   references: {
    //     table: "LoaiSanPhams",
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
    // await queryInterface.removeConstraint("SanPhams", "sp_lsp_id_FK");
  },
};
