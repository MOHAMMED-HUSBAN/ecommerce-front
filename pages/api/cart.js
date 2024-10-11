import connectDB from "@/lib/mongoose";

import {Product} from "@/models/Product";

export default async function handle(req,res) {
  await connectDB();
  const ids = req.body.ids;
  res.json(await Product.find({_id:ids}));
}