import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons/faSliders";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import PriceRangeSlider from "@/app/(main)/shop/PriceRangeSlider";
import Item from "@/conponents/Slider/Item";
import SkeletonItem from "@/conponents/Slider/SkeletonItem";
import FilterOptions from "@/app/(main)/shop/FilterOptions";

const Filter = () => {
    return (
        <div className="w-1/5 p-4 border-r-2">
            <div className="flex justify-between items-center">
                <h1 className="text-black text-2xl font-bold">Filter</h1>
                <FontAwesomeIcon icon={faSliders} rotation={90} className="text-black size-6"/>
            </div>
            <hr className="border-gray-300 my-4"/>
            <div className="space-y-2">
                <FilterOptions title="Brand"></FilterOptions>
                <FilterOptions title="Sort By"></FilterOptions>
            </div>
            <hr className="border-gray-300 my-4"/>
            <div className="mt-8">
                <PriceRangeSlider></PriceRangeSlider>
            </div>
        </div>
    );
}
export default Filter;
