import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./ui/ButtonRef";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/hooks/use-cart";




const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cart = useCartStore();

    const navigate = useNavigate()


    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button onClick={() => navigate('/cart')} className="flex items-center rounded-full bg-slate-900 px-4 py-2">
                <ShoppingBag
                    size={15}
                    color="white"
                />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    );
}

export default NavbarActions;