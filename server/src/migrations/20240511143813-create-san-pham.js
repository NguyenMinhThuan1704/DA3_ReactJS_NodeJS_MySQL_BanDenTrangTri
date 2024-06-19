'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SanPhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaLoaiSanPham: {
        type: Sequelize.INTEGER
      },
      TenSanPham: {
        type: Sequelize.STRING
      },
      AnhDaiDien: {
        type: Sequelize.STRING
      },
      Gia: {
        type: Sequelize.INTEGER
      },
      GiaGiam: {
        type: Sequelize.INTEGER
      },
      SoLuong: {
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
    await queryInterface.dropTable('SanPhams');
  }
};