'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoaiSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoaiSanPham.init({
    TenLoaiSanPham: DataTypes.STRING,
    NoiDung: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LoaiSanPham',
    tableName: 'loaisanphams',
  });
  return LoaiSanPham;
};