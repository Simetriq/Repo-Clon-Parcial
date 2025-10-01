import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";
export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
AssetCategoryModel.belongsTo(AssetModel, {
  foreignKey: "asset_model_id",
  as: "asset_category",
});
AssetCategoryModel.belongsTo(CategoryModel, {
  foreignKey: "category_model_id",
  as: "asset_category",
});

AssetModel.hasMany(AssetCategoryModel, {
  foreignKey: "asset_model_id",
  as: "asset",
  onDelete: "cascade",
});
CategoryModel.hasMany(AssetCategoryModel, {
  foreignKey: "category_model_id",
  as: "category",
  onDelete: "cascade",
});
