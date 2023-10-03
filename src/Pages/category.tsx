import { getCategoryProductsIDs } from "@/actions/get-product";
import { useEffect, useState } from "react";

export const revalidate = 0;
interface CategoryPageProps{
    params: {
        categoryID:string
    },
    searchParams: {
        colorID: string
        sizeID: string
    }
}

const CategoryPage: React.FC<CategoryPageProps> = ({
    params,
    searchParams
}) => {
    const [products, setProducts] = useState<Product>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            const productData = await getCategoryProductsIDs(params.categoryID);
        }
    
      
    }, [])
    

    return (
        <div>

        </div>)
}

export default CategoryPage;