"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChiTietSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChiTietSanPham.belongsTo(models.NhaPhanPhoi, {
        foreignKey: "MaNhaPhanPhoi",
        as: "nhaPhanPhoi",
      });
      ChiTietSanPham.belongsTo(models.SanPham, {
        foreignKey: "MaSanPham",
        as: "sanPham",
      });
    }
  }
  ChiTietSanPham.init(
    {
      MaSanPham: DataTypes.INTEGER,
      MaNhaPhanPhoi: DataTypes.INTEGER,
      MoTa: DataTypes.STRING,
      ChiTiet: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChiTietSanPham",
    }
  );
  return ChiTietSanPham;
};
