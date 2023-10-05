
import { Color } from "../types"
const shopID = "shop1"
const URL = `http://localhost:8080/api/v1/color/`

const getColor = async (id: string): Promise<Color> => {
    const res = await fetch(URL + `${id}`);
    return res.json();
}
const getColors = async (): Promise<Color[]> => {
    const res = await fetch(URL + `${shopID}/all`);
    return res.json();
}

export { getColor, getColors };