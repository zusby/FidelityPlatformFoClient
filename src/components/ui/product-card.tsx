import { Product } from "@/types"
import IconButton from "./icon-button"
import { Expand, ShoppingCart } from 'lucide-react'
import Currency from "./currency"
import { useNavigate } from "react-router-dom"
import { MouseEventHandler } from "react"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCartStore from "@/hooks/use-cart"

interface ProductCard {
    data: Product

}


const ProductCard: React.FC<ProductCard> = ({
    data
}) => {

    const navigate = useNavigate();
    const cart = useCartStore();
    const handleClick = () => {
        navigate(`/product/${data.id}`)
    }

    const previewModal = usePreviewModal();

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }


    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            { }
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <img src={data.images[0].url} className="object-cover w-full h-full aspect-square rounded-md" alt="Image" />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />} />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart className="text-gray-600" />} />

                    </div>

                </div>
            </div>
            {/*descritpion */}
            <div>
                <p className="font-semibold textx-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category.name}
                </p>
            </div>
            {/**price  */}
            <div className="flex items-center justify-between">
                <Currency value={data.price} />
            </div>
        </div>
    )
}
export default ProductCard