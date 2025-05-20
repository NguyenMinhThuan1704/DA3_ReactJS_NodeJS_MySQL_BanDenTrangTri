"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DanhGia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DanhGia.belongsTo(models.SanPham, {
        foreignKey: "MaSanPham",
        as: "sanPham",
      });
    }
  }
  DanhGia.init(
    {
      MaSanPham: DataTypes.INTEGER,
      MoTa: DataTypes.STRING,
      SoSao: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DanhGia",
      tableName: "DanhGias",
    }
  );
  return DanhGia;
};
