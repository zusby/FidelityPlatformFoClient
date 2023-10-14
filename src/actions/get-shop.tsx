import { Store } from "@/types";

const API_BASE_URL = "http://localhost:8080/api/v1/shop/";
const storeID = "shop1";

const getShop = async (): Promise<Store> => {
    const res = await fetch(API_BASE_URL + storeID);
    return res.json();
};


export default getShop;