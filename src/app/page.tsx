import {ChevronRightIcon} from "@heroicons/react/24/outline"
import Image from "next/image";
import Slider from "@/conponents/Slider";
import SliderCategory from "@/conponents/Slider/SliderCategory/SliderCategory";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruckFast} from "@fortawesome/free-solid-svg-icons/faTruckFast";
import {faHeadset} from "@fortawesome/free-solid-svg-icons/faHeadset";
import {faShield} from "@fortawesome/free-solid-svg-icons/faShield";
import {useState} from "react";

export default function Home() {
    return (
        <>
            <div className="flex mx-32 ">
                <div className="flex flex-col justify-between mt-4 pr-3 min-w-64">
                    <div className="flex items-center justify-between">
                        <a className="text-black text-lg font-medium">Woman’s Fashion</a>
                        <ChevronRightIcon className="size-6 text-black ml-8"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <a className="text-black text-lg font-medium">Men’s Fashion</a>
                        <ChevronRightIcon className="size-6 text-black ml-8"/>
                    </div>
                    <a className="text-black text-lg font-medium">Electronics</a>
                    <a className="text-black text-lg font-medium">Home & Lifestyle</a>
                    <a className="text-black text-lg font-medium">Medicine</a>
                    <a className="text-black text-lg font-medium">Sports & Outdoor</a>
                    <a className="text-black text-lg font-medium">Baby’s & Toys</a>
                    <a className="text-black text-lg font-medium">Health & Beauty</a>
                </div>
                <div className="w-2 border-b-black border-r-2"/>
                <div className="w-full ml-8 mt-8">
                    <Image
                        src="/img/home-img.png"
                        alt="abc"
                        width={1980}
                        height={300}
                    />
                </div>
            </div>

            <div className="space-y-16 mx-32 my-24">
                <div>
                    <Slider title="Today" descibe="Flash Sales" time titleButton="View All Product"></Slider>
                </div>


                <div>
                    <SliderCategory></SliderCategory>
                </div>
                <div>
                    <Slider title="This Month" descibe="Best Selling Products" titleButton="View All"></Slider>
                </div>
            </div>
            <div className="flex justify-around mx-32 my-24 ">
                <div className="flex flex-col items-center justify-center scale-75 transition-transform duration-300 ease-in-out hover:scale-100">
                    <div className="bg-gray-200 p-6 rounded-full">
                        <div className="bg-black p-6 rounded-full">
                            <FontAwesomeIcon icon={faTruckFast} className="text-white size-8"/>
                        </div>
                    </div>
                    <div className="my-8">
                        <h1 className="text-2xl text-black">FREE AND FAST DELIVERY</h1>
                        <p className="text-black text-center"> Free delivery for all orders over $140 </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center scale-75 transition-transform duration-300 ease-in-out hover:scale-100">
                    <div className="bg-gray-200 p-6 rounded-full">
                        <div className="bg-black p-6 rounded-full">
                            <FontAwesomeIcon icon={faHeadset} className="text-white size-8"/>
                        </div>
                    </div>
                    <div className="my-8">
                        <h1 className="text-2xl text-black">24/7 CUSTOMER SERVICE</h1>
                        <p className="text-black text-center"> Friendly 24/7 customer support </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center scale-75 transition-transform duration-300 ease-in-out hover:scale-100">
                    <div className="bg-gray-200 p-6 rounded-full">
                        <div className="bg-black p-6 rounded-full">
                            <FontAwesomeIcon icon={faShield} className="text-white size-8"/>
                        </div>
                    </div>
                    <div className="my-8">
                        <h1 className="text-2xl text-black">MONEY BACK GUARANTEE</h1>
                        <p className="text-black text-center"> We reurn money within 30 days </p>
                    </div>
                </div>
            </div>

        </>
    );
}
