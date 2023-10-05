import { getCategory } from "@/actions/get-categories";
import { getCategoryProductsIDs, getProduct } from "@/actions/get-product";
import Billboard from "@/components/Billboard";

import Container from "@/components/ui/container";
import { Billboard as BillboardType, Category, Product, ProductIDs } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CategoryPageProps {
  searchParams: {
    colorID: string;
    sizeID: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ searchParams }) => {
  const [productsIDs, setProductsIDs] = useState<ProductIDs[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [category, setCategory] = useState<Category>();
  const [billboard, setBillboard] = useState<BillboardType | undefined>(); // Initialize as undefined
  const { categoryID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDataIDs = await getCategoryProductsIDs(categoryID || "");
        setProductsIDs(productDataIDs);

        const products = productDataIDs.map((productID) => getProduct(productID));
        const productResults = await Promise.all(products);
        setProducts(productResults);

        const fetchedCategory = await getCategory(categoryID || "");
        setCategory(fetchedCategory);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData().then(() => {
      setLoading(false); // Set loading to false once data is fetched
    });
  }, [categoryID, searchParams]);

  useEffect(() => {
    if (!loading && category) {
      // Check if loading is false and category is available
      setBillboard(category.billBoard);
    }
  }, [loading, category]);

  if (!loading && billboard) {
    return (
      <div className="">
        <Container>
          <Billboard data={billboard} />
        </Container>
      </div>
    );
  }

  // Return null when category is not available yet
  return (<> loading...</>)
};

export default CategoryPage;
