
import { Size } from "../types"
const storeID = "shop1";
const URL = `http://localhost:8080/api/v1/size/`

const getSize = async (id: string): Promise<Size> => {
    const res = await fetch(URL + `${id}`);
    return res.json();
}

const getSizes = async (): Promise<Size[]> => {
    const res = await fetch(URL + `${storeID}/all`);
    return res.json();
}

export { getSize, getSizes };