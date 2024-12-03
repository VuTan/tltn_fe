'use client'
import Rate from "@/conponents/Rate";
import React, {useEffect, useState} from "react";
import QuantityButton from "@/conponents/Button/QuantityButton";
import ViewAllButton from "@/conponents/Button/ViewAllButton";
import FavoriteButton from "@/conponents/Button/FavoriteButton";
import {faTruckFast} from "@fortawesome/free-solid-svg-icons/faTruckFast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import ProcessBar from "@/conponents/Product/ProcessBar";
import Comment from "@/app/(main)/shop/[category]/[id]/Comment";
import {EmblaCarousel} from "@/conponents/Carousel/basic";
import ThumbnailsCarousel from "@/conponents/Carousel/Thumbnails/thumbnails";
import {sendRequest} from "@/utils/apis";
import OptionsRadio from "@/conponents/Product/Options";

const ProductPage = ({params}: { params: { id: string } }) => {
    const {id} = params;
    const [data, setData] = useState();
    const [showAll, setShowAll] = useState(false);


    useEffect(() => {
        const res = sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/product/${id}`,
            method: "GET",
        }).then((response) => {
            // Set dữ liệu vào state
            setData(response.data);
        })
    }, []);
    console.log(data)


    const handleSeeMore = () => {
        setShowAll(!showAll); // Khi nhấn "See More", sẽ đảo trạng thái
    };


    return (
        <div className="flex flex-col p-24">
            <div className="flex">
                <div className="flex mr-12 w-3/5">
                    <ThumbnailsCarousel slides={data?.imgs}/>
                </div>
                <div className="w-2/5">
                    <h1 className="text-2xl font-bold text-left">{data?.name}</h1>
                    <div className="flex mt-2 items-center">
                        <Rate></Rate>
                        <p className="text-gray-600">(99)</p>
                    </div>
                    <p className="mt-2 mb-3 text-xl text-black">${data?.price}</p>
                    <div
                        className={`overflow-hidden transition-max-height ease-in-out duration-1000 ${showAll ? 'max-h-[1000px]' : 'max-h-32'}`}
                    >
                        {data?.spec.map((item, index) => {
                            return (<div className="flex mt-1">
                                <p className="list-disc text-sm font-semibold text-nowrap" key={index}>{item.spec}:</p>
                                <p className="list-disc text-sm mx-2" key={index}>{item.value}</p>
                            </div>)
                        })}
                    </div>
                    <button onClick={handleSeeMore} className="text-blue-500 hover:underline focus:outline-none">
                        {showAll ? 'See Less' : 'See More'}
                    </button>

                    <hr className="border-[1px] border-black my-6"/>
                    <div className="flex flex-col">
                        <div className="pt-4 items-center space-y-2">
                            <p className="text-lg font-semibold">Options</p>
                            <OptionsRadio options={data?.options}/>
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

                        <div className="mt-12">
                            <p className="text-lg font-semibold">About this item</p>
                            {data?.des.map((item, index) => {
                                return (<li className="list-disc" key={index}>{item}</li>)
                            })}

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
