'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.allcodes, { foreignKey: 'positionId', targetKey: 'code', as: 'positionData'})
      user.belongsTo(models.allcodes, { foreignKey: 'gender', targetKey: 'code', as: 'genderData'})
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB,

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};