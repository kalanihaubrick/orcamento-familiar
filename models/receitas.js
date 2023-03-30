'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  receitas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL(5,2),
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'receitas',
  });
  return receitas;
};