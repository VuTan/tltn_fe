import React from 'react';
import ImgItem from "@/app/conponents/Slider/ImgItem";
import Rate from "@/app/conponents/Rate";
import Link from "next/link";


function Item() {

    return (
        <Link href="/shop/product">
            <div className="flex flex-col">
                <ImgItem></ImgItem>
                <h2 className="mt-2 text-left font-semibold">HAVIT HV-G92 Gamepad</h2>
                <div className="flex mt-2">
                    <h2 className="text-left text-red-600"> $120 </h2>
                    <h2 className="ml-4 line-through text-left text-gray-600"> $160 </h2>
                </div>
                <div className="flex mt-2 items-center">
                    <Rate></Rate>
                    <p className="text-gray-600">(69)</p>
                </div>
            </div>
        </Link>
    );
}

export default Item;