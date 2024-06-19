'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDonNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HoaDonNhap.belongsTo(models.NhaPhanPhoi, { foreignKey: 'MaNhaPhanPhoi', as: 'nhaPhanPhoi' });
      HoaDonNhap.belongsTo(models.TaiKhoan, { foreignKey: 'MaTaiKhoan', as: 'taiKhoan' });
    }
  }
  HoaDonNhap.init({
    MaNhaPhanPhoi: DataTypes.INTEGER,
    MaTaiKhoan: DataTypes.INTEGER,
    KieuThanhToan: DataTypes.STRING,
    TongTien: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HoaDonNhap',
  });
  return HoaDonNhap;
};