"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChiTietHoaDonNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChiTietHoaDonNhap.belongsTo(models.SanPham, {
        foreignKey: "MaSanPham",
        as: "sanPham",
      });
      ChiTietHoaDonNhap.belongsTo(models.HoaDonNhap, {
        foreignKey: "MaHoaDonNhap",
        as: "hoaDonNhap",
      });
    }
  }
  ChiTietHoaDonNhap.init(
    {
      MaHoaDonNhap: DataTypes.INTEGER,
      MaSanPham: DataTypes.INTEGER,
      SoLuongCTHDN: DataTypes.INTEGER,
      GiaNhap: DataTypes.INTEGER,
      TongTienCTHDN: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ChiTietHoaDonNhap",
    }
  );
  return ChiTietHoaDonNhap;
};
