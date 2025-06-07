"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.SanPham, {
        foreignKey: "MaSanPham",
        as: "sanPham",
      });
      Cart.belongsTo(models.TaiKhoan, {
        foreignKey: "MaTaiKhoan",
        as: "taiKhoan",
      });
    }
  }
  Cart.init(
    {
      MaSanPham: DataTypes.INTEGER,
      MaTaiKhoan: DataTypes.INTEGER,
      SoLuong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
    }
  );
  return Cart;
};
