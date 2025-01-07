'use client'
import {faTag} from "@fortawesome/free-solid-svg-icons/faTag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {sendRequest} from "@/utils/apis";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {addDiscount} from "@/redux/cart.reducer";

export default function OrderSumany() {
    const dispatch = useDispatch()
    const router = useRouter();
    const session = useSession()
    const cart = useSelector((state) => state.cart);
    const [promoCode, setPromoCode] = useState("");
    const [valueCode, setValueCode] = useState(10)
    const [active, setActice] = useState(false)

    const cartRequest = cart.cartArr.map((item) => {
        return {
            id: item._id,
            option: item.option?.type || null, // Nếu không có option, trả về null
            quantity: item.quantity,
        };
    });


    // Hàm xử lý khi input thay đổi
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPromoCode(event.target.value); // Cập nhật giá trị promoCode
    };

    // Hàm xử lý khi nhấn nút Apply
    const handleApplyPromoCode = () => {
        if (promoCode.trim() === "") {
            toast.error(`Please enter a promo code`, {
                position: "bottom-right"
            })
            return;
        }
        if (promoCode === "GIAMGIA10%") {
            toast.success(`Promo code "${promoCode}" applied!`, {
                position: "bottom-right"
            })
            dispatch(addDiscount(10))
            setValueCode(10)
            setActice(true)
        } else if (promoCode === "GIAMGIA20%") {
            toast.success(`Promo code "${promoCode}" applied!`, {
                position: "bottom-right"
            })
            dispatch(addDiscount(20))
            setValueCode(20)
            setActice(true)
        } else {
            toast.error(`Promo code "${promoCode}" is invalid!`, {
                position: "bottom-right"
            })
        }
    };

    const handleCheckout = async () => {
        console.log(cartRequest)
        try {

            // Kiểm tra nếu người dùng chưa có token xác thực
            if (!session?.data?.user?.access_token) {
                toast.error('User is not authenticated!', {position: 'bottom-right'});
                return;
            }

            // Gửi request kiểm tra tồn kho
            const productsData = await sendRequest<IBackendRes<any>>({
                    url: `http://localhost:8080/api/product/check-stock`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${session?.data?.user?.access_token}`
                    },
                    body: cartRequest
                })
            ;

            if (productsData) {
                router.push('/cart/checkout')
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            toast.error(`Something went wrong!`, {position: "bottom-right"});
        }
    };


    return (
        <div className="flex flex-col">
            <h2 className="text-left text-black text-2xl font-bold">Order Summany</h2>
            <div className="flex justify-between mt-4">
                <p className="text-black font-extralight">Subtotal</p>
                <p className="text-black font-bold">${cart.cartTotalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-4">
                <p className="text-black font-extralight">Discount</p>
                {active ? (
                        <p className="text-red-500 font-bold">$ -{(cart.cartTotalAmount * valueCode / 100).toFixed(2)}</p>
                    ) :
                    (
                        <p className="text-red-500 font-bold">$ -0</p>
                    )}
            </div>
            <hr className="my-4"/>
            <div className="flex justify-between">
                <p className="text-black">Total</p>
                {active ? (
                        <p className="text-black font-bold">${(cart.cartTotalAmount - cart.cartTotalAmount * valueCode / 100).toFixed(2)}</p>
                    ) :
                    (
                        <p className="text-black font-bold">${cart.cartTotalAmount.toFixed(2)}</p>
                    )}
            </div>
            <div className="flex mt-4 space-x-3">
                {/* Input */}
                <div className="flex rounded-full w-3/4 bg-gray-200 p-2 px-4 items-center">
                    <FontAwesomeIcon
                        icon={faTag}
                        className="size-5 mr-2 pr-2 border-r-2 border-gray-400 text-gray-400"
                    />
                    <input
                        className="text-gray-400 bg-gray-200 outline-none flex-1"
                        placeholder="Add promo code"
                        value={promoCode} // Gắn giá trị state
                        onChange={handleInputChange} // Sự kiện thay đổi
                    />
                </div>
                <div
                    className="text-white text-center content-center rounded-3xl bg-black w-1/4 flex items-center justify-center cursor-pointer"
                    onClick={handleApplyPromoCode} // Sự kiện nhấn nút Apply
                >
                    Apply
                </div>
            </div>
            <button onClick={handleCheckout}
                    className="text-white text-center mt-4 p-2 content-center rounded-3xl bg-black w-full hover:bg-gray-800">
                Check Out
            </button>
        </div>
    )
}
