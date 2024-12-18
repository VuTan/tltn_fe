'use client'
import Rate from "@/conponents/Rate";
import React, {useState} from "react";
import OptionsRadio from "@/conponents/Product/Options";
import QuantityButton from "@/conponents/Button/QuantityButton";
import FavoriteButton from "@/conponents/Button/FavoriteButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruckFast} from "@fortawesome/free-solid-svg-icons/faTruckFast";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import Spec from "@/app/(main)/shop/[category]/[id]/spec";
import {Product} from "@/models/Product";
import {useDispatch} from "react-redux";
import {addProduct} from "@/redux/cart.reducer";

const InfomationProduct = ({data}) => {
    const [selectedOption, setSelectedOption] = useState();
    const [quantity, setQuantity] = useState(1)
    const [showAll, setShowAll] = useState(false)
    const dispatch = useDispatch()

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    console.log(data)


    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        console.log("Số lượng cập nhật từ component con:", newQuantity);
    };

    const handleAddToCart = (data) => {
        const product: Product = {
            _id: data._id,
            name: data.name,
            option: selectedOption,
            price: selectedOption ? selectedOption.price : data.price,
            quantity: quantity,
            img: data.imgs[0]
        }
        console.log("Dispatching Product:", product);
        dispatch(addProduct(product))

    }

    return (
        <div className="w-[55%]">
            <h1 className="text-2xl font-bold text-left">{data?.data.name}</h1>
            <div className="flex mt-2 items-center">
                <Rate rate={data?.data.rate}></Rate>
                <p className="text-gray-600">({data?.data.ratings})</p>
            </div>
            <p className="mt-2 mb-3 text-xl text-black">${selectedOption ? selectedOption.price : data?.data.price}</p>
            <Spec data={data?.data.spec}/>
            <hr className="border-[1px] border-black my-6"/>
            <div className="flex flex-col">
                <div className="pt-4 items-center space-y-2">
                    {data?.data.options && (<>
                            <p className="text-lg font-semibold">Options</p>
                            <OptionsRadio options={data?.data.options} onOptionChange={handleOptionChange}/>
                        </>
                    )}
                </div>
                <div className="flex mt-6 justify-between">
                    <QuantityButton quantity={quantity} onQuantityChange={handleQuantityChange}></QuantityButton>
                    <div className="flex space-x-4">
                        <div className="min-w-40 content-center">
                            <button className="w-full text-center bg-red-500 p-2 rounded-lg"
                                    onClick={() => handleAddToCart(data?.data)}>Buy Now
                            </button>
                        </div>
                        <div className="px-1 rounded-lg content-center border-2 select-none"><FavoriteButton
                            favorite></FavoriteButton></div>
                    </div>
                </div>
                <div className="mt-12">
                    <div className="flex border-2 rounded-t-lg p-4  items-center">
                        <FontAwesomeIcon icon={faTruckFast} className="text-black size-16"/>
                        <div className="ml-4">
                            <p className="text-nowrap text-black text-lg">Free Delivery</p>
                            <p className="text-nowrap text-black text-sm">Enter your postal code for Delivery
                                Availability</p>
                        </div>
                    </div>
                    <div className="flex border-2 rounded-b-lg border-t-0 p-4">
                        <FontAwesomeIcon icon={faClockRotateLeft} className="text-black size-14 "/>
                        <div className="ml-4">
                            <p className="text-nowrap text-black text-lg">Return Delivery</p>
                            <p className="text-nowrap text-black text-sm">Free 30 Days Delivery Returns.
                                Details</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-lg font-semibold">About this item</p>

                    {data?.data.des && (
                        <>
                            {/* Hiển thị danh sách mô tả */}
                            {(showAll ? data.data.des : data.data.des.slice(0, 1)).map((item, index) => (
                                <li className="list-disc" key={index}>
                                    {item}
                                </li>
                            ))}

                            {/* Nút See More / See Less */}
                            {data.data.des.length > 1 && (
                                <button
                                    onClick={() => setShowAll(!showAll)} // Toggle trạng thái
                                    className="mt-2 text-blue-500 hover:underline"
                                >
                                    {showAll ? 'See less' : 'See more'}
                                </button>
                            )}
                        </>
                    )}
                </div>


            </div>
        </div>
    )
}

export default InfomationProduct