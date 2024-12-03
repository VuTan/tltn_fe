import {faTag} from "@fortawesome/free-solid-svg-icons/faTag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function OrderSumany() {

    return (
        <div className="flex flex-col">
            <h2 className="text-left text-black text-2xl font-bold">Order Summany</h2>
            <div className="flex justify-between mt-4">
                <p className="text-black font-extralight">Subtotal</p>
                <p className="text-black font-bold">$ 576.00</p>
            </div>
            <div className="flex justify-between mt-4">
                <p className="text-black font-extralight">Discount</p>
                <p className="text-red-500 font-bold">-$ 0</p>
            </div>
            <div className="flex justify-between mt-4">
                <p className="text-black font-extralight">Delivery Fee</p>
                <p className="text-black font-bold">$ 15.00</p>
            </div>
            <hr className="my-4"/>
            <div className="flex justify-between">
                <p className="text-black">Total</p>
                <p className="text-black font-bold">$ 591.00</p>
            </div>
            <div className="flex mt-4 space-x-3">
                <div className="flex rounded-full w-3/4 bg-gray-200 p-2 px-4 items-center">
                    <FontAwesomeIcon icon={faTag}
                                     className="size-5 mr-2 pr-2 border-r-2 border-gray-400 text-gray-400"/>
                    <p className="text-gray-400">Add promo code</p>
                </div>
                <div className="text-white text-center content-center rounded-3xl bg-black w-1/4">
                    Apply
                </div>
            </div>
            <div className="text-white text-center mt-4 p-2 content-center rounded-3xl bg-black w-full">
                Check Out
            </div>
        </div>
    )
}
