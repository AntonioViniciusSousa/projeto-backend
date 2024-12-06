const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const ProductsModel = require("../models/ProductsModel");
const CategoriesModel = require("../models/CategoriesModel");

class ProductsCategoryModel extends Model {}

ProductsCategoryModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //preenchimento obrigatório
      references: {
        model: ProductsModel,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //preenchimento obrigatório
      references: {
        model: CategoriesModel,
        key: "id",
      },
    },
  },
  {
    tableName: "productsCategory",
    sequelize: connection,
    timestamps: false,
  }
);

ProductsModel.belongsToMany(CategoriesModel, { through: ProductsCategoryModel });
CategoriesModel.belongsToMany(ProductsModel, { through: ProductsCategoryModel });

module.exports = ProductsCategoryModel;
