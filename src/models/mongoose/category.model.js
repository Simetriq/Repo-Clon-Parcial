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
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
CategorySchema.virtual("asset", {
  ref: "asset",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});
CategorySchema.set("toObject", { virtuals: true });
CategorySchema.set("toJSON", { virtuals: true });

CategorySchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getQuery();

  const category = await this.model.findOne(filter);
  if (category) await AssetModel.deleteMany({ category: category._id });

  next();
});

export const CategoryModel = model("Category", CategorySchema);
