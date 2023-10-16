import { Store } from "@/types";

const API_BASE_URL = import.meta.env.VITE_BASE_URL
const storeID = import.meta.env.VITE_STOREID;

const getShop = async (): Promise<Store> => {
    const res = await fetch(API_BASE_URL + `shop/${storeID}`);
    return res.json();
};


export default getShop;