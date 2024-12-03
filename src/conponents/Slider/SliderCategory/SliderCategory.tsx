import React from 'react';
import RoundButtonDirection from "@/conponents/Button/RoundButtonDirection";
import ItemCategory from "@/conponents/Slider/SliderCategory/item";
import {faMobileScreen} from "@fortawesome/free-solid-svg-icons/faMobileScreen";
import {faComputer} from "@fortawesome/free-solid-svg-icons/faComputer";
import {faHeadphones} from "@fortawesome/free-solid-svg-icons/faHeadphones";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {faGamepad} from "@fortawesome/free-solid-svg-icons/faGamepad";
import {faKeyboard} from "@fortawesome/free-regular-svg-icons/faKeyboard";

const SliderCategory = () => {
    const category = [{
        icon: faMobileScreen,
        category: "Phone",
        link: "Phone"
    }, {
        icon: faComputer,
        category: "PC",
        link: "PC"
    }, {
        icon: faHeadphones,
        category: "HeadPhones",
        link: "Headphones"
    }, {
        icon: faCamera,
        category: "Camera",
        link: "Camera"
    }, {
        icon: faGamepad,
        category: "Laptop",
        link: "Laptop"
    }, {
        icon: faKeyboard,
        category: "Keyboard",
        link: "PC"
    }]
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <div className="w-8 h-12 bg-red-500 rounded"></div>
                <h2 className="text-red-500 ml-4">Categories</h2>
            </div>
            <div className="my-4 flex flex-row justify-between items-center">
                <h1 className="text-4xl text-black font-bold">Browse By Category</h1>
                <div className="flex space-x-3">
                    <RoundButtonDirection left></RoundButtonDirection>
                    <RoundButtonDirection></RoundButtonDirection>
                </div>
            </div>
            <div className="flex my-10 justify-between">
                {category.map((cat, index) => (
                    <ItemCategory key={index} icon={cat.icon} category={cat.category} link={cat?.link}/>
                ))}
            </div>
            <hr/>
        </div>
    );
};

export default SliderCategory;