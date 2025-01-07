'use client'
import React from 'react';
import Image from "next/image";
import FavoriteButton from "@/conponents/Button/FavoriteButton";
import EyeButton from "@/conponents/Button/EyeButton";


function ImgItem({src}) {
    const handleAddToCartClick = (e) => {
        e.preventDefault();
        console.log("add to cart")
    };

    return (
        <div className="relative w-60 h-60 bg-gray-100 group overflow-hidden ">
            <div className="absolute flex flex-col space-y-2 right-0 m-2">
                <div className=""><FavoriteButton favorite></FavoriteButton></div>
                <EyeButton src="/img/item.png"></EyeButton>
            </div>
            <Image className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                   src={src} alt="" height={200}
                   width={200}
                   style={{
                       width: '100%', // Ví dụ: làm cho ảnh lấp đầy container
                       height: '100%', // Ví dụ: làm cho ảnh lấp đầy container
                       objectFit: 'cover', // Điều chỉnh cách ảnh vừa với container
                   }}
            />
            <div
                className="absolute w-full bottom-0 bg-black translate-y-12 transition-transform duration-500 group-hover:translate-y-0">
                <p onClick={handleAddToCartClick} className="text-center text-white ">Add To Cart</p>
            </div>
        </div>
    );
}

export default ImgItem;