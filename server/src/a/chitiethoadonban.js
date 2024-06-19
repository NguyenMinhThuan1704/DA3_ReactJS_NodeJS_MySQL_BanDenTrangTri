'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietHoaDonBan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChiTietHoaDonBan.belongsTo(models.SanPham, { foreignKey: 'MaSanPham', as: 'sanPham' });
      ChiTietHoaDonBan.belongsTo(models.HoaDonBan, { foreignKey: 'MaHoaDonBan', as: 'hoaDonBan' });
    }
  }
  ChiTietHoaDonBan.init({
    MaHoaDonBan: DataTypes.INTEGER,
    MaSanPham: DataTypes.INTEGER,
    SoLuongCTHDB: DataTypes.INTEGER,
    GiaCTHDB: DataTypes.INTEGER,
    TongGia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChiTietHoaDonBan',
  });
  return ChiTietHoaDonBan;
};