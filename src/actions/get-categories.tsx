import { Category } from "@/types"

const shopID = import.meta.env.VITE_STOREID;
// eslint-disable-next-line react-refresh/only-export-components
const URL = import.meta.env.VITE_BASE_URL;

const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(URL + `category/${shopID}/all`);
    return res.json();
}

const getCategory = async (id: string): Promise<Category> => {
    const res = await fetch(URL + `category/${id}`);
    return res.json();
}
export { getCategory, getCategories }
