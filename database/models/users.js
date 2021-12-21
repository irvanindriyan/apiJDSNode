'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  const ENUM_VAL = ['admin', 'user'];
  Users.init({
    nik: DataTypes.STRING,
    role: { 
      type: DataTypes.ENUM,
      values: ENUM_VAL,
      allowNull: false,
      validate: {
        notNull: { msg: "Role is required" },
        isIn:{
          args: [ENUM_VAL],
          msg: "Role must be Admin or User"
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};