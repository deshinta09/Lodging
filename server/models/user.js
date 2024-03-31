'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Lodging, {foreignKey:"authorId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING, allowNull: false,
      unique:{args: true, msg:"Email must be unique"},
      validate:{
        notNull:{args: true,msg:"Email is require"},
        isEmail:{msg:"Email must be type email"},
        notEmpty:{msg:"Email is require"}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
       len:5,
       notEmpty:{msg:"Password is require"}
     }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
  });  
  return User;
};