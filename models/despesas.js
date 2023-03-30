'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class despesas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  despesas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL(5,2),
    data: DataTypes.DATEONLY,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'despesas',
  });
  return despesas;
};