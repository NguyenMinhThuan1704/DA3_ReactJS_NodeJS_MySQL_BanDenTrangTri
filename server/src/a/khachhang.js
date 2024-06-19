'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhachHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KhachHang.belongsTo(models.TaiKhoan, { foreignKey: 'MaTaiKhoan', as: 'taiKhoan' });
    }
  }
  KhachHang.init({
    MaTaiKhoan: DataTypes.INTEGER,
    TenKH: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    SoDienThoai: DataTypes.INTEGER,
    Email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KhachHang',
  });
  return KhachHang;
};