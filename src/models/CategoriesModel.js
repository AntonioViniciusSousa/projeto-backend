const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");

class CategoriesModel extends Model {}

CategoriesModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    tableName: "categories",
    sequelize: connection,
  }
);

module.exports = CategoriesModel;
