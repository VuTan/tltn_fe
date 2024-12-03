import SkeletonItem from "@/conponents/Slider/SkeletonItem";
import Item from "@/conponents/Slider/Item";
import React from "react";

const ContentShop = () => {
    return (
        <div className="w-full">
            <div
                className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center items-center">
                <SkeletonItem/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </div>
        </div>
    );
}
export default ContentShop;
