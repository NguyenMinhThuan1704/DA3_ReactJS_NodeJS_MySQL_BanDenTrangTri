'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietHoaDonNhaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaHoaDonNhap: {
        type: Sequelize.INTEGER
      },
      MaSanPham: {
        type: Sequelize.INTEGER
      },
      SoLuongCTHDN: {
        type: Sequelize.INTEGER
      },
      GiaNhap: {
        type: Sequelize.INTEGER
      },
      TongTienCTHDN: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChiTietHoaDonNhaps');
  }
};