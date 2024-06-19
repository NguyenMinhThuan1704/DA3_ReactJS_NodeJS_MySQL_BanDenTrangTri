'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDonBan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HoaDonBan.belongsTo(models.KhachHang, { foreignKey: 'MaKH', as: 'khachHang' });
    }
  }
  HoaDonBan.init({
    MaKH: DataTypes.INTEGER,
    TenKH: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    SoDienThoai: DataTypes.INTEGER,
    Email: DataTypes.STRING,
    TrangThai: DataTypes.BOOLEAN,
    TongGia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HoaDonBan',
  });
  return HoaDonBan;
};