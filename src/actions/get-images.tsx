
import { Image } from "../types"

const URL = `http://localhost:8080/api/v1/image/`

const getImages = async (productID: string): Promise<Image[]> => {
    const res = await fetch(URL + `${productID}/all`);

    return res.json();
}

export default getImages;