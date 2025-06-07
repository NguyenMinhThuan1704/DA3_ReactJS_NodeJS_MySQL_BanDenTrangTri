'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaiKhoan.belongsTo(models.LoaiTaiKhoan, { foreignKey: 'MaLoaiTK', as: 'loaiTaiKhoan' });
    }
  }
  TaiKhoan.init({
    MaLoaiTK: DataTypes.INTEGER,
    TaiKhoan: DataTypes.STRING,
    MatKhau: DataTypes.STRING,
    Email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaiKhoan',
    tableName: 'taikhoans',
  });
  return TaiKhoan;
};