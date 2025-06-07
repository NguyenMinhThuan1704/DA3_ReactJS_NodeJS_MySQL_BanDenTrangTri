'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoaiTaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoaiTaiKhoan.init({
    TenLoaiTK: DataTypes.STRING,
    MoTa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LoaiTaiKhoan',
    tableName: 'loaitaikhoans',
  });
  return LoaiTaiKhoan;
};