"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Users, {
        foreignKey: "ownerId",
        as: "owner",
      });
      Products.belongsTo(models.category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }
  Products.init(
    {
      ownerId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      price: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
      categoryId: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
