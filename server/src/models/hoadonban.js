"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HoaDonBan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HoaDonBan.belongsTo(models.TaiKhoan, {
        foreignKey: "MaKH",
        as: "taikhoan",
      });
    }
  }
  HoaDonBan.init(
    {
      MaKH: DataTypes.INTEGER,
      TenKH: DataTypes.STRING,
      DiaChi: DataTypes.STRING,
      SoDienThoai: DataTypes.STRING,
      Email: DataTypes.STRING,
      TrangThaiDuyet: DataTypes.BOOLEAN,
      Shipped: DataTypes.BOOLEAN,
      TongGia: DataTypes.INTEGER,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HoaDonBan",
    }
  );
  return HoaDonBan;
};
