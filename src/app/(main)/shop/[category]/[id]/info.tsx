'use client'
import Rate from "@/conponents/Rate";
import React, {useState} from "react";
import Spec from "@/app/(main)/shop/[category]/[id]/Spec";
import OptionsRadio from "@/conponents/Product/Options";
import QuantityButton from "@/conponents/Button/QuantityButton";
import ViewAllButton from "@/conponents/Button/ViewAllButton";
import FavoriteButton from "@/conponents/Button/FavoriteButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruckFast} from "@fortawesome/free-solid-svg-icons/faTruckFast";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";

const InfomationProduct = ({data}) => {
    const [selectedOption, setSelectedOption] = useState();
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div className="w-2/5">
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
                    <p className="text-lg font-semibold">Options</p>
                    <OptionsRadio options={data?.data.options} onOptionChange={handleOptionChange}/>
                </div>
                <div className="flex mt-6 justify-between">
                    <QuantityButton></QuantityButton>
                    <div className="flex space-x-4">
                        <div className="min-w-40 content-center"><ViewAllButton title="Buy Now"></ViewAllButton>
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
                    {data?.data.des.map((item, index) => {
                        return (<li className="list-disc" key={index}>{item}</li>)
                    })}

                </div>

            </div>
        </div>
    )
}

export default InfomationProduct