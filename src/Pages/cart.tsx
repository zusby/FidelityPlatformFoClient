import CartItem from "@/components/CartItem";
import Summary from "@/components/Summary";
import Container from "@/components/ui/container";
import useCartStore from "@/hooks/use-cart";

const CartPage = () => {




    const cart = useCartStore();

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="">
                        Shopping Cart
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && <p className="text-neutral-500"> No items added to cart</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary />

                    </div>

                </div>

            </Container>
            CartPage
        </div>
    )
}

export default CartPage;