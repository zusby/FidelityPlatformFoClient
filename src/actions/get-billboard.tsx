
import { Billboard } from "../types"

const URL = import.meta.env.VITE_BASE_URL;

const getBillboard = async (id: string): Promise<Billboard> => {
    const res = await fetch(URL + `billboard/${id}`);

    return res.json();
}

export default getBillboard;