import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: { type: Object },
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);

// إنشاء بيانات جديدة وإدخالها في قاعدة البيانات
async function createProduct() {
  try {
    const newProduct = new Product({
      title: "HUSBAN",
      description: "This is an example description.",
      price: 100,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1NiCsy6F7KIXMuj450gidOPotLj9rCT0_Q&s", "https://www.edustore.de/wp-content/uploads/mba13-m3-midnight-gallery5-202402.jpeg"],
      category: "634f1d88fc13ae28e2000001", // معرّف التصنيف إذا كان موجودًا
      properties: { color: "red", size: "M" },
    });

    const savedProduct = await newProduct.save();
    console.log("Product saved:", savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

createProduct();
