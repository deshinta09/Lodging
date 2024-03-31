'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lodging.belongsTo(models.User,{foreignKey:"authorId"})
      Lodging.belongsTo(models.Type, {foreignKey:"typeId"})
    }
  }
  Lodging.init({
    name: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Name Lodging is require"},
        notEmpty:{msg:"Name Lodging is require"},
      }
    },
    facility: {
      type: DataTypes.TEXT, allowNull: false,
      validate:{
        notNull:{msg:"Facility Lodging is require"},
        notEmpty:{msg:"Facility Lodging is require"},
      }
    },
    roomCapacity: {
      type: DataTypes.INTEGER, allowNull: false,
      validate:{
        notNull:{msg:"Capacity Lodging is require"},
        notEmpty:{msg:"Capacity Lodging is require"},
      }
    },
    imgUrl: {
      type: DataTypes.STRING, allowNull: false, isUrl: true,
      validate:{
        notNull:{msg:"Image Url Lodging is require"},
        notEmpty:{msg:"Image Url Lodging is require"},
        isUrl:{args: true, msg:"Falsy to format image url"}
      }
    },
    location:{
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Location Lodging is require"},
        notEmpty:{msg:"Location Lodging is require"},
      }
    },
    price: {
      type: DataTypes.INTEGER, allowNull: false,
      validate:{
        notNull:{msg:"Price Lodging is require"},
        notEmpty:{msg:"Price Lodging is require"},
        min:{args:200, msg:"Price minimal 200"}
      }
    },
    typeId: {
      type: DataTypes.INTEGER, allowNull: false,
      validate:{
        notNull:{msg:"TypeId Lodging is require"},
        notEmpty:{msg:"TypeId Lodging is require"},
      }
    },
    authorId: {
      type: DataTypes.INTEGER, allowNull: false,
      validate:{
        notNull:{msg:"AuthorId Lodging is require"},
        notEmpty:{msg:"AuthorId Lodging is require"},
      }
    }
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};