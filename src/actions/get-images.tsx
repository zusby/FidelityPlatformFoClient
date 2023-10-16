
import { Image } from "../types"

const URL = import.meta.env.VITE_BASE_URL;

const getImages = async (productID: string): Promise<Image[]> => {
    const res = await fetch(URL + `image/${productID}/all`);

    return res.json();
}

export default getImages;