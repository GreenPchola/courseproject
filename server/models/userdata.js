'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userData.init({
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    workOrganization: DataTypes.STRING,
    profession: DataTypes.STRING,
    aboutUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userData',
  });
  return userData;
};