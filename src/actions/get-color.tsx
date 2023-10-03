
import { Color } from "../types"

const URL = `http://localhost:8080/api/v1/color/`

const getColor = async (id: string): Promise<Color> => {
    const res = await fetch(URL + `${id}`);
    return res.json();
}

export default getColor;