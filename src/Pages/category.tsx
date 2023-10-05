import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCategoryProductsIDs, getProduct } from '@/actions/get-product';
import { getCategory } from '@/actions/get-categories';
import { getColors } from '@/actions/get-color';
import Billboard from '@/components/Billboard';
import Container from '@/components/ui/container';
import NoResult from '@/components/ui/null-result';
import ProductCard from '@/components/ui/product-card';

import { Category, Color, Product, Size } from '@/types';
import { getSizes } from '@/actions/get-size';
import Filter from './filter';
import MobileFilter from './mobileFilters';


const CategoryPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<Category | undefined>();
    const { categoryID } = useParams<{ categoryID: string }>();
    const [sizes, setSizes] = useState<Size[] | undefined>();
    const [colors, setColors] = useState<Color[] | undefined>();

    const [selectedFilters, setSelectedFilters] = useState({
        colorID: searchParams.get("colorID") || '',
        sizeID: searchParams.get("sizeID") || '',
    });

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const handleFilterChange = (filterKey: string, filterValue: string) => {
        const updatedFilters = {
            ...selectedFilters,
            [filterKey]: filterValue,
        };
        setSelectedFilters(updatedFilters);

        // Perform filtering logic here and update filteredProducts
        const filtered = products.filter((product) => {
            return (
                (!updatedFilters.colorID || product.color.id === updatedFilters.colorID) &&
                (!updatedFilters.sizeID || product.size.id === updatedFilters.sizeID)
            );
        });

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDataIDs = await getCategoryProductsIDs(categoryID || '');

                const products = productDataIDs.map((productID) => getProduct(productID));
                const productResults = await Promise.all(products);

                setProducts(productResults);

                const fetchedCategory = await getCategory(categoryID || '');
                setCategory(fetchedCategory);

                const sizes = await getSizes();
                setSizes(sizes);

                const colors = await getColors();
                setColors(colors);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData().then(() => {
            setLoading(false);
        });
    }, [categoryID]);

    useEffect(() => {
        if (selectedFilters.colorID === '' && selectedFilters.sizeID === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => {
                return (
                    (!selectedFilters.colorID || product.color.id === selectedFilters.colorID) &&
                    (!selectedFilters.sizeID || product.size.id === selectedFilters.sizeID)
                );
            });

            setFilteredProducts(filtered);
        }
    }, [selectedFilters, products, searchParams]);





    if (!loading && category && sizes && colors) {
        return (
            <div className="">
                <Container>
                    <Billboard data={category.billboard} />
                    <div className="px-4 sm:px-6 lg:px-8 pb-24">
                        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                            <MobileFilter
                                sizes={sizes}
                                colors={colors}
                                selectedFilters={selectedFilters}
                                onFilterChange={handleFilterChange}
                            />
                            <div className="hidden lg:block">
                                <Filter
                                    valueKey="sizeID"
                                    name="Sizes"
                                    data={sizes}
                                    onFilterChange={handleFilterChange}
                                />
                                <Filter
                                    valueKey="colorID"
                                    name="Colors"
                                    data={colors}
                                    onFilterChange={handleFilterChange}
                                />
                            </div>
                            <div className="mt-6 lg:col-span-4 lg:mt-0">
                                {filteredProducts.length === 0 && <NoResult />}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {filteredProducts.map((item) => (
                                        <ProductCard key={item.id} data={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return <div>Loading...</div>;
};

export default CategoryPage;