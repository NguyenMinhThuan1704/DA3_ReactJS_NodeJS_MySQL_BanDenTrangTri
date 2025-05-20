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
    // await queryInterface.addConstraint("Carts", {
    //   fields: ["MaTaiKhoan"],
    //   type: "foreign key",
    //   name: "cart_tk_FK",
    //   references: {
    //     table: "TaiKhoans",
    //     field: "id",
    //   },
    // });
    // await queryInterface.addConstraint("Carts", {
    //   fields: ["MaSanPham"],
    //   type: "foreign key",
    //   name: "cart_sp_FK",
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
    // await queryInterface.removeConstraint("Carts", "cart_tk_FK");
    // await queryInterface.removeConstraint("Carts", "cart_sp_FK");
  },
};
