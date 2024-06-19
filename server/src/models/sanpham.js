'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SanPham.belongsTo(models.LoaiSanPham, { foreignKey: 'MaLoaiSanPham', as: 'loaiSanPham' });
    }
  }
  SanPham.init({
    MaLoaiSanPham: DataTypes.INTEGER,
    TenSanPham: DataTypes.STRING,
    AnhDaiDien: DataTypes.STRING,
    Gia: DataTypes.INTEGER,
    GiaGiam: DataTypes.INTEGER,
    SoLuong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SanPham',
  });
  return SanPham;
};