import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from '@/models/Product';
import connectDB from "@/lib/mongoose"; // Use connectDB instead of mongooseConnect
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '67095dab7bb524d4f988df4b';

  await connectDB(); // Connect to MongoDB
  console.log("Database connected successfully");

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

  // تحقق من أن `featuredProduct` ليس null أو undefined
  if (!featuredProduct) {
    console.log("Product not found with ID:", featuredProductId);
    return {
      notFound: true, // إذا لم يتم العثور على المنتج، يمكن إرجاع صفحة 404
    };
  }

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}