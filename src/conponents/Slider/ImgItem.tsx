import React from 'react';
import Image from "next/image";
import FavoriteButton from "@/app/conponents/Button/FavoriteButton";
import EyeButton from "@/app/conponents/Button/EyeButton";


function ImgItem() {

    return (
        <div className="relative w-60 h-60 bg-gray-100 group overflow-hidden ">
            <div className="absolute flex flex-col space-y-2 right-0 m-2">
                <FavoriteButton favorite></FavoriteButton>
                <EyeButton></EyeButton>
            </div>
            <Image className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                   src="/img/item.png" alt="asdasd" height={100}
                   width={100}/>
            <div className="absolute w-full bottom-0 bg-black translate-y-12 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-center text-white ">Add To Cart</p>
            </div>
        </div>
    );
}

export default ImgItem;