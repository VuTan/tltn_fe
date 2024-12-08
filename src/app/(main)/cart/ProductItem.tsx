'use client'
import Image from "next/image";
import QuantityButton from "@/conponents/Button/QuantityButton";
import TrashButton from "@/conponents/Button/TrashButton";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {changeQuantity, removeProduct} from "@/redux/cart.reducer";

export default function ProductCartItem({product}) {
    const [quantity, setQuantity] = useState(product.quantity)
    const dispatch = useDispatch()

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity)
    };

    const handleRemoveProduct = () => {
        dispatch(removeProduct(product))
    }

    useEffect(() => {
        dispatch(changeQuantity({product, quantity: quantity}));
    }, [quantity]);

    return (
        <div className="flex">
            <Image src={product.img} alt="product" width={150} height={100}/>
            <div className="flex flex-col ml-4 space-y-2">
                <div>
                    <p className="text-black text-lg font-bold">{product.name}</p>
                </div>
                {product?.option && (
                    <div className="flex align-center space-x-4 items-center">
                        <p>Option</p>
                        <p className="text-black text-lg font-bold">{product.option.type}</p>
                    </div>
                )}
                <div className="flex align-center space-x-4 items-center">
                    <p>Price per product:</p>
                    <p className="text-black text-lg font-bold">${product.price}</p>
                </div>
                <div className="flex align-center space-x-4 items-center">
                    <p>Totoal:</p>
                    <p className="text-black text-lg font-bold">${product.price * product.quantity}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end ml-auto">
                <TrashButton onClick={handleRemoveProduct}></TrashButton>
                <QuantityButton notRemove={false} quantity={quantity}
                                onQuantityChange={handleQuantityChange}></QuantityButton>
            </div>
        </div>
    )
}
