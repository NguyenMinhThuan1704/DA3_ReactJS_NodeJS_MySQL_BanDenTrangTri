"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HoaDonBans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MaKH: {
        type: Sequelize.INTEGER,
      },
      TenKH: {
        type: Sequelize.STRING,
      },
      DiaChi: {
        type: Sequelize.STRING,
      },
      SoDienThoai: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      TrangThaiDuyet: {
        type: Sequelize.BOOLEAN,
      },
      Shipped: {
        type: Sequelize.BOOLEAN,
      },
      TongGia: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      TrangThai: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("HoaDonBans");
  },
};
