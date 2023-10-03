
import { Billboard } from "../types"

const URL = `http://localhost:8080/api/v1/billboard/`

const getBillboard = async (id: string): Promise<Billboard> => {
    const res = await fetch(URL + `${id}`);

    return res.json();
}

export default getBillboard;