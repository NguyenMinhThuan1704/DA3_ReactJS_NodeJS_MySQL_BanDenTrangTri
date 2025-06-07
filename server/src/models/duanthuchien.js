"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DuAnThucHien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DuAnThucHien.init(
    {
      TieuDe: DataTypes.STRING,
      AnhDaiDien: DataTypes.STRING,
      MoTa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DuAnThucHien",
      tableName: "duanthuchiens",
    }
  );
  return DuAnThucHien;
};
