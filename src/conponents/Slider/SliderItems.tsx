import React from 'react';
import Item from "@/app/conponents/Slider/Item";

function SliderItems() {

    return (
        <div className="flex space-x-10 overflow-x-auto scrollbar">
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
        </div>
    );
}

export default SliderItems;