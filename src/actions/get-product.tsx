import { Product, ProductIDs } from "../types";
import { getCategory } from "./get-categories";
import { getColor } from "./get-color";
import getImages from "./get-images";
import { getSize } from "./get-size";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const storeID = import.meta.env.VITE_STOREID;

const getProductAllIDs = async (): Promise<ProductIDs[]> => {
    const res = await fetch(API_BASE_URL + storeID);
    return res.json();
};

const getFeaturedProductAllIDs = async (): Promise<ProductIDs[]> => {
    const res = await fetch(API_BASE_URL + `product/${storeID}/featured/all`);
    return res.json();
};

const getProductIDs = async (productID: string): Promise<ProductIDs> => {
    const res = await fetch(API_BASE_URL + `product/${productID}`)
    return res.json();
}

const getCategoryProductsIDs = async (categoryID: string): Promise<ProductIDs[]> => {
    const res = await fetch(API_BASE_URL + `product/category/${categoryID}/all`)
    return res.json();
}


const getProduct = async (product: ProductIDs): Promise<Product> => {
    try {

        const color = await getColor(product.colorID);
        const category = await getCategory(product.categoryID);
        const size = await getSize(product.sizeID);
        try {
            const images = await getImages(product.id)
            const newProduct: Product = {
                category: category,
                storeID: product.storeID,
                id: product.id,
                name: product.name,
                price: product.price,
                size: size,
                color: color,
                images: images, // Assign the images here
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                isFeatured: product.isFeatured,
                isArchived: product.isArchived,
            };
            return newProduct
        } catch (error) { console.log(error) }
        const newProduct: Product = {
            category: category,
            storeID: product.storeID,
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            color: color,
            images: [],
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            isFeatured: product.isFeatured,
            isArchived: product.isArchived,
        };
        return newProduct
    } catch (error) {
        console.error("Error fetching product details:", error);
        // You can decide whether to rethrow or handle the error here
        throw error;
    }
};

export { getProductAllIDs, getProduct, getFeaturedProductAllIDs, getProductIDs, getCategoryProductsIDs };
