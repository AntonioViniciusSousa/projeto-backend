const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const ProductsModel = require("../models/ProductsModel");

class ProductOptionsModel extends Model {}

ProductOptionsModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //preenchimento obrigatório
      references: {
        model: ProductsModel,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, //preenchimento obrigatório
    },
    shape: {
      type: DataTypes.ENUM('square','circle'),
      allowNull: true, //preenchimento opcional
      defaultValue: 'square', //valor padrão = square
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true, //preenchimento opcional
      defaultValue: 0, //valor padrão = 0
    },
    type: {
      type: DataTypes.ENUM('text','color'),
      allowNull: true, //preenchimento opcional
      defaultValue: 'text', //valor padrão = text
    },
    values:{
      type: DataTypes.STRING,
      allowNull: false, //preenchimento obrigatório
    },
  },
  {
    tableName: "productOptions",
    sequelize: connection,
    timestamps: false,
  }
);

ProductsModel.hasMany(ProductOptionsModel, {
  foreignKey: "product_id",
  as: "productOptions",
});
ProductOptionsModel.belongsTo(ProductsModel, {
  foreignKey: "product_id",
  as: "products",
});

module.exports = ProductOptionsModel;
