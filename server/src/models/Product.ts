import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tradeMark: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});
const Product = model("Product", ProductSchema);

export default Product;
