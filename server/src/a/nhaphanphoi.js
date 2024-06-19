'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhaPhanPhoi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NhaPhanPhoi.init({
    TenNhaPhanPhoi: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    SoDienThoai: DataTypes.STRING,
    MoTa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NhaPhanPhoi',
  });
  return NhaPhanPhoi;
};
