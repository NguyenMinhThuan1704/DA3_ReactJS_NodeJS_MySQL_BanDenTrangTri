'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HoaDonNhaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaNhaPhanPhoi: {
        type: Sequelize.INTEGER
      },
      MaTaiKhoan: {
        type: Sequelize.INTEGER
      },
      KieuThanhToan: {
        type: Sequelize.STRING
      },
      TongTien: {
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
    await queryInterface.dropTable('HoaDonNhaps');
  }
};