import useCartStore from "@/hooks/use-cart";
import Button from "./ui/ButtonRef";
import Currency from "./ui/currency";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";



const Summary = () => {
    const storeID = import.meta.env.VITE_STOREID;
    const items = useCartStore((state) => state.items);
    const [searchParams] = useSearchParams();
    const removeAll = useCartStore((state) => state.removeAll)
    const baseURL = import.meta.env.BASE_URL;

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Payment completed succesfully!", { id: "success" })
            removeAll();

        }

        if (searchParams.get("canceled")) {
            toast.error("Something went wrong...", { id: "error" });
        }

    }, [searchParams, removeAll])



    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0)




    const onCheckout = async () => {
        const data = {
            storeID: storeID,
            orderItems: items.map((item) => ({ productID: item.id })),
        }
        await fetch(baseURL + "stripe/create-checkout-session", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.text())
            .then(sessionUrl => {
                window.location.assign(sessionUrl);
            })
    }

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className=" text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>

            </div>
            <Button className="w-full mt-6" onClick={onCheckout}> Checkout</Button>
        </div>
    )
}

export default Summary;