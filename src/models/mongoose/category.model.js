import { Schema, model } from "mongoose";
import { AssetModel } from "./asset.model.js";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ! FALTA COMPLETAR ACA
CategorySchema.virtual("assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "categories",
  justOne: false,
});

CategorySchema.pre("findOneAndDelete", async function (next) {
  const category = await this.model.findOne(this.getFilter());
  
  if (category) {
    // Remover esta categoría de todos los assets que la referencian
    await AssetModel.updateMany(
      { categories: category._id },
      { $pull: { categories: category._id } }
    );
  }
  
  next();
});

export const CategoryModel = model("Category", CategorySchema);
