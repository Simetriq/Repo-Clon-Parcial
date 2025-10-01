import { Schema, model } from "mongoose";
import { CategoryModel } from "./category.model.js";

// TODO: completar relaciones embebidas y referenciadas

const AssetSchema = new Schema(
  {
    inventoryNumber: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    model: { type: String, required: true, minlength: 2, maxlength: 100 },
    status: {
      type: String,
      enum: ["good", "regular", "bad", "out_of_service"],
      default: "good",
    },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true, min: 0 },
    // ! FALTA COMPLETAR ACA
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El autor es requerido"],
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

AssetSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getQuery();

  const asset = await this.model.findOne(filter);
  if (asset) await CategoryModel.deleteMany({ asset: asset._id });

  next();
});

export const AssetModel = model("Asset", AssetSchema);
