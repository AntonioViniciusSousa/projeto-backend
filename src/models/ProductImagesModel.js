const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const ProductsModel = require("../models/ProductsModel");

class ProductImagesModel extends Model {}

ProductImagesModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true, //preenchimento opcional
      defaultValue: 0, //valor padrão = 0
      references: {
        model: ProductsModel,
        key: "id",
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true, //preenchimento opcional
      defaultValue: 0, //valor padrão = 0
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false, //preenchimento obrigatório
    },
  },
  {
    tableName: "productImages",
    sequelize: connection,
    timestamps: false,
  }
);

ProductsModel.hasMany(ProductImagesModel, {
  foreignKey: "product_id",
  as: "productImages",
});
ProductImagesModel.belongsTo(ProductsModel, {
  foreignKey: "product_id",
  as: "products",
});

module.exports = ProductImagesModel;
