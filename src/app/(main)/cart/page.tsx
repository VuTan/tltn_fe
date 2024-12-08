'use client'
import ProductCartItem from "@/app/(main)/cart/ProductItem";
import OrderSumany from "@/app/(main)/cart/OrderSumany";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";

const CartPage = () => {
    const cart = useSelector((state) => state.cart); // Lấy cart từ Redux store
    const [isMounted, setIsMounted] = useState(false);

    // Set state after component mounts to prevent hydration error
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Optionally, you can return a loading state here
    }

    return (
        <div className="p-24">
            <Toaster/>
            <h1 className="text-left text-black text-3xl">Your cart</h1>
            <div className="flex space-x-8 mt-4">
                <div className="w-2/3 border-2 rounded-lg p-8">
                    {cart?.cartArr?.length > 0 ? (
                        cart.cartArr.map((product) => (
                            <div key={product._id}>
                                <ProductCartItem product={product}/>
                                <hr className="my-8"/>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
                <div className="w-1/3 border-2 rounded-lg p-8 h-fit">
                    <OrderSumany/>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
