
import { Size } from "../types"
const storeID = import.meta.env.VITE_STOREID;
const URL = import.meta.env.VITE_BASE_URL

const getSize = async (id: string): Promise<Size> => {
    const res = await fetch(URL + `size/${id}`);
    return res.json();
}

const getSizes = async (): Promise<Size[]> => {
    const res = await fetch(URL + `size/${storeID}/all`);
    return res.json();
}

export { getSize, getSizes };