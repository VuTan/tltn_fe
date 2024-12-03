import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";
import PriceRangeSlider from "@/app/(main)/shop/[category]/PriceRangeSlider";
import FilterOptions from "@/app/(main)/shop/[category]/FilterOptions";


const Filter = (props: any) => {
    const {category} = props;


    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-black text-2xl font-bold">Filter</h1>
                <FontAwesomeIcon icon={faSliders} rotation={90} className="text-black size-6"/>
            </div>
            <hr className="border-gray-300 my-4"/>
            <div className="space-y-2">
                {category?.categoryName && category?.subcategories && (
                    <FilterOptions
                        title={category.categoryName}
                        data={category.subcategories.map((sub: any) => sub.title)}
                    />
                )}
                <FilterOptions
                    title="Sort By"
                    data={["Price Low to High", "Price High to Low", "Newest", "Oldest"]}
                />
            </div>
            <hr className="border-gray-300 my-4"/>
            <div className="mt-8">
                <PriceRangeSlider/>
            </div>
        </>
    );
};

export default Filter;
