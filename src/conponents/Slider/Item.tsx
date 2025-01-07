import React from 'react';
import ImgItem from "@/conponents/Slider/ImgItem";
import Rate from "@/conponents/Rate";
import Link from "next/link";


function Item({item}) {
    const sale = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    return (
        <Link href="/shop/product">
            <div className="flex flex-col">
                <ImgItem src={item.imgs[0]}></ImgItem>
                <h2 className="mt-2 text-left font-semibold line-clamp-3">{item.name}</h2>
                <div className="flex mt-2">
                    <h2 className="text-left text-red-600"> {item.price} </h2>
                    <h2 className="ml-4 line-through text-left text-gray-600"> {(item.price / (1 - sale / 100)).toFixed(2)} </h2>
                </div>
                <div className="flex mt-2 items-center">
                    <Rate rate={item.rate}></Rate>
                    <p className="text-gray-600">({item.ratings})</p>
                </div>
            </div>
        </Link>
    );
}

export default Item;