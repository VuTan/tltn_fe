import React from 'react';
import Item from "@/conponents/Slider/Item";
import SkeletonItem from "@/conponents/Slider/SkeletonItem";

function SliderItems() {

    return (
        <div className="flex space-x-10 overflow-x-auto scrollbar">
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <SkeletonItem></SkeletonItem>
        </div>
    );
}

export default SliderItems;