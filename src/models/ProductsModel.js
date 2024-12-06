const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");

class ProductsModel extends Model {}

ProductsModel.init(
  {
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true, //preenchimento opcional
      defaultValue: 0, //valor padrão = 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, //preenchimento obrigatório
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize: connection,
  }
);

module.exports = ProductsModel;
