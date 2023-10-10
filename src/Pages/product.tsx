import { getCategoryProductsIDs, getProduct, getProductIDs } from "@/actions/get-product";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";
import { Product, ProductIDs } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"



const ProductPage = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [productIDs, setProductIDs] = useState<ProductIDs>()
    const [productData, setProductData] = useState<Product>();
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productIDsData = await getProductIDs(params.productID ? params.productID : "");
                setProductIDs(productIDsData);
                const productData = await getProduct(productIDsData);
                setProductData(productData);
            } catch (error) { console.log(error) }

            try {
                const productsData = await getCategoryProductsIDs(productIDs?.categoryID ? productIDs.categoryID : "");
                const productPromises = productsData.map(async (product) => getProduct(product));
                const productResults = await Promise.all(productPromises);

                setProducts(productResults);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Imposta loading su false dopo aver completato il fetch
            }
        };



        fetchData();
        setLoading(false);
    }, [params.productID, productIDs?.categoryID]);


    if (!loading && productData)
        return (
            <div className="bg-white">
                <Container>
                    <div className="px-4 py-10 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                            <Gallery images={productData?.images ? productData.images : []} />
                            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                <Info data={productData} />
                            </div>
                        </div>
                        <hr className="my-10" />
                        <ProductList title="Related Items" items={products} />

                    </div>
                </Container>


            </div>
        )
}

export default ProductPage