import getShop from "@/actions/get-shop"
import { Store } from "@/types";
import { useEffect, useState } from "react";

const Footer = () => {
    const [shop, setShop] = useState<Store>();

    useEffect(() => {
        async function getShopData() {
            const data = await getShop();
            setShop(data);
        }
        getShopData();
    }, [])


    const default_title = "E-commerce"
    document.title = shop?.name || default_title;

    return (
        <footer className="bg-white border-t">
            <div className="max-auto py-10">
                <span className="text-center text-xs text-black">
                    <p>
                        &copy;2023 Unicam made for educational purpose only
                    </p>
                    <p>
                        Vat Code: {shop?.vatNumber}
                    </p>
                    <p>
                        email: {shop?.space.email}
                    </p>
                </span>
            </div>
        </footer>
    )
}

export default Footer