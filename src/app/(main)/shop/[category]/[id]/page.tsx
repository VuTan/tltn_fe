import Rate from "@/conponents/Rate";
import React from "react";
import ColorRadio from "@/conponents/Product/ColorRadio";
import SizeRadio from "@/conponents/Product/SizeRadio";
import QuantityButton from "@/conponents/Button/QuantityButton";
import ViewAllButton from "@/conponents/Button/ViewAllButton";
import FavoriteButton from "@/conponents/Button/FavoriteButton";
import {faTruckFast} from "@fortawesome/free-solid-svg-icons/faTruckFast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import ProcessBar from "@/conponents/Product/ProcessBar";
import Comment from "@/app/(main)/shop/[category]/product/Comment";
import {EmblaCarousel} from "@/conponents/Carousel/basic";
import ThumbnailsCarousel from "@/conponents/Carousel/Thumbnails/thumbnails";

const ProductPage = () => {
    return (
        <div className="flex flex-col p-24">
            <div className="flex">
                <div className="flex mr-12 w-3/5">
                    <ThumbnailsCarousel slides={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
                </div>
                <div className="w-2/5">
                    <h1 className="text-2xl font-bold text-left">Havic HV G-92 Gamepad</h1>
                    <div className="flex mt-2 items-center">
                        <Rate></Rate>
                        <p className="text-gray-600">(99)</p>
                    </div>
                    <p className="mt-2 text-xl text-black">$ 192.00</p>
                    <p className="mt-2 text-black">PlayStation 5 Controller Skin High quality vinyl with air channel
                        adhesive for easy bubble free
                        install & mess free removal Pressure sensitive.</p>
                    <hr className="border-[1px] border-black my-6"/>
                    <div className="flex flex-col">
                        <div className="flex">
                            <p className="text-black text-xl">Colours: </p>
                            <ColorRadio></ColorRadio>
                        </div>
                        <div className="flex pt-4 items-center">
                            <p className="text-black text-xl">Size: </p>
                            <SizeRadio></SizeRadio>
                        </div>
                        <div className="flex mt-6 justify-between">
                            <QuantityButton></QuantityButton>
                            <div className="flex space-x-4">
                                <div className="min-w-40 content-center"><ViewAllButton title="Buy Now"></ViewAllButton>
                                </div>
                                <div className="px-1 rounded content-center border-2 select-none"><FavoriteButton
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
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <EmblaCarousel/>
                <div className="mt-16 grid grid-cols-4 grid-rows-2 gap-6">
                    <div className="flex flex-col row-span-2 space-y-1">
                        <p className="text-black text-lg font-bold">Customer Reviews</p>
                        <div className="flex">
                            <Rate></Rate>
                            <p className="text-gray-600">(100)</p>
                        </div>
                        <ProcessBar></ProcessBar>
                    </div>
                    <div className="col-span-3 row-span-2">
                        <Comment></Comment>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductPage;
