
import { Color } from "../types"
const shopID = import.meta.env.VITE_STOREID;
const URL = import.meta.env.VITE_BASE_URL;

const getColor = async (id: string): Promise<Color> => {
    const res = await fetch(URL + `color/${id}`);
    return res.json();
}
const getColors = async (): Promise<Color[]> => {
    const res = await fetch(URL + `color/${shopID}/all`);
    return res.json();
}

export { getColor, getColors };