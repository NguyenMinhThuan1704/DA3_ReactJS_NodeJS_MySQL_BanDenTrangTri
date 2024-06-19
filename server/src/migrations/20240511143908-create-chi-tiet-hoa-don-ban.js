'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietHoaDonBans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaHoaDonBan: {
        type: Sequelize.INTEGER
      },
      MaSanPham: {
        type: Sequelize.INTEGER
      },
      SoLuongCTHDB: {
        type: Sequelize.INTEGER
      },
      GiaCTHDB: {
        type: Sequelize.INTEGER
      },
      TongGia: {
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
    await queryInterface.dropTable('ChiTietHoaDonBans');
  }
};