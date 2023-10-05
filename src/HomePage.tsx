import { useEffect, useState } from "react";
import Container from "./components/ui/container";
import { Billboard as BillboardType, Product } from "./types";
import getBillboard from "./actions/get-billboard";
import Billboard from "./components/Billboard";
import { getFeaturedProductAllIDs, getProduct } from "./actions/get-product";
import ProductList from "./components/products-list";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [billboard, setbillboard] = useState<BillboardType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const billboardData = await getBillboard("3cebd97b-ad64-4f33-9dbc-2effa4b45f39");
        setbillboard(billboardData);
      } catch (error) {
        console.error("Error fetching billboard:", error);
      }

      try {
        const productsData = await getFeaturedProductAllIDs();
        const productPromises = productsData.map((product) => getProduct(product));
        const productResults = await Promise.all(productPromises);

        setProducts(productResults);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []); 

  if (!loading) {
    if (billboard)
      return (
        <Container>
          <div className="space-y-10 pb-10">
            <Billboard data={billboard} />

            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
              <ProductList title="Featured products" items={products} />
            </div>
          </div>
        </Container>
      )
  }
}
