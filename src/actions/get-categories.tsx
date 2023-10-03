import { Category } from "@/types"

const shopID = "shop1"
// eslint-disable-next-line react-refresh/only-export-components
const URL = `http://localhost:8080/api/v1/category/`

const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(URL + `${shopID}/all`);

    return res.json();
}

const getCategory = async (id: string): Promise<Category> => {
    const res = await fetch(URL + `${id}`);
    return res.json();
}
export { getCategory, getCategories }
