'use strict';
const {
  Model
} = require('sequelize');
const { hashPwd } = require('../helpers/hashPwd')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please input an email format'
        },
        notEmpty: {
          msg: 'Email Required'
        },
        notNull: {
          msg: 'Email Required'
        }
      },
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password Required'
        },
        notNull: {
          msg: 'Password Required'
        },
        pwdLength(value) {
          if(value.length < 6) {
            throw new Error ('Password length must more than 6 character')
          }
        }
      },
      allowNull: false
    },
    organization: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        if(user.organization == '') {
          user.organization = 'Hacktiv8'
        }
        user.password = hashPwd(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};