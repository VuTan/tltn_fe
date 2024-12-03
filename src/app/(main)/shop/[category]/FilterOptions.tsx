'use client'
import React, {useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/16/solid";

const FilterOptions = (props: any) => {
    const {title, data} = props;
    const [drop, setDrop] = useState(false);

    const handleDrop = () => {
        setDrop(!drop);
    };

    return (
        <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={handleDrop}>
                <a className="text-black text-lg font-bold">{title}</a>
                {drop ?
                    <ChevronRightIcon className="size-6 text-black font-bold ml-8"/>
                    :
                    <ChevronDownIcon className="size-6 text-black font-bold ml-8"/>}
            </div>
            <div className={`flex flex-col ml-3 space-y-1 ${drop ? '' : 'hidden'}`}>
                {data?.map((item, index) => (
                    <a href={`/shop/${title}?subcategory=${item}`} key={index} className="text-md font-normal hover:underline cursor-pointer">
                        {item}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FilterOptions;
