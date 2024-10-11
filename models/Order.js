import { model, models, Schema } from "mongoose";

// تعريف الـ Order schema
const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
  paid: Boolean,
}, {
  timestamps: true,
});

// إنشاء الـ Model بناءً على الـ schema
const Order = models?.Order || model('Order', OrderSchema);

// إنشاء بيانات جديدة وإدخالها في قاعدة البيانات
async function createOrder() {
  try {
    const newOrder = new Order({
      line_items: { productId: "634f1d88fc13ae28e2000001", quantity: 2 },
      name: "John Doe",
      email: "johndoe@example.com",
      city: "New York",
      postalCode: "10001",
      streetAddress: "123 Main St",
      country: "USA",
      paid: true,
    });

    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

createOrder();
