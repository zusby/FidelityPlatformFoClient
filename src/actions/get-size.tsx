
import { Size } from "../types"

const URL = `http://localhost:8080/api/v1/size/`

const getSize = async (id: string): Promise<Size> => {
    const res = await fetch(URL + `${id}`);
    return res.json();
}

export default getSize;