import ProductCartItem from "@/app/(main)/cart/ProductItem";
import OrderSumany from "@/app/(main)/cart/OrderSumany";

const CartPage = () => {
    return (
        <div className="p-24">
            <h1 className="text-left text-black text-3xl">Your cart</h1>
            <div className="flex space-x-8 mt-4">
                <div className="w-2/3 border-2 rounded-lg p-8">
                    <ProductCartItem></ProductCartItem>
                    <hr className="my-8"/>
                    <ProductCartItem></ProductCartItem>
                    <hr className="my-8"/>
                    <ProductCartItem></ProductCartItem>
                </div>
                <div className="w-1/3 border-2 rounded-lg p-8 h-fit">
                    <OrderSumany></OrderSumany>
                </div>
            </div>
        </div>
    );
}
export default CartPage;
