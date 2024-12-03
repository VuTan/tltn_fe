import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Rate from "@/conponents/Rate";
import FavoriteButton from "@/conponents/Button/FavoriteButton";
import EyeButton from "@/conponents/Button/EyeButton";


function Item(props: any) {
    const {data, category} = props;
    return (
        <Link href={`/shop/${category}/${data._id}`}>
            <div className=' flex py-4 m-8'>
                <div className="relative max-w-[320px] max-h-[320px] overflow-hidden">
                    <Image
                        src={data?.imgs[0]}
                        alt={data.name}
                        width={320}
                        height={320}

                    />
                    <div className="absolute space-y-2 top-0 right-0 ">
                        <FavoriteButton favorite/>
                        <EyeButton src={data?.imgs[0]}/>
                    </div>
                </div>
                <div className="flex flex-col max-w-[60rem] ml-4 justify-between space-y-1">
                    <div className='space-y-1'>
                        <p className="font-medium text-xl ">{data.name}</p>
                        <p className="font-bold text-2xl mt-2 ">${data.price}</p>
                        <div className="flex ">
                            <Rate rate={data.rate}></Rate>
                            <p>({data.ratings})</p>
                        </div>
                        {data.stock > 0 && (
                            <p className="font-medium">In Stock</p>
                        )}

                    </div>
                    <div className="flex space-x-4">
                        <div className="text-center p-2 bg-yellow-300 border-2 rounded-2xl">
                            Add to cart
                        </div>
                        {data.options && data.options.length > 0 && (
                            <div className="text-center p-2 border-2 rounded-2xl">
                                See options
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr className="w-full border-[1px] border-gray-100"/>
        </Link>
    );
}

export default Item;