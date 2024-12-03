'use client'
import React, {useState} from 'react';
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import {ChevronRightIcon} from "@heroicons/react/16/solid";

const FilterOptions = (props: any) => {
    const {title, data} = props;
    const [drop, setDrop] = useState(false);

    const handleDrop = () => {
        setDrop(!drop);
    };

    return (
        <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={handleDrop}>
                <a className="text-black text-lg font-medium">{title}</a>
                {drop ?
                    <ChevronRightIcon className="size-6 text-black font-bold ml-8"/>
                    :
                    <ChevronDownIcon className="size-6 text-black font-bold ml-8"/>}
            </div>
            <div className={`ml-2 space-y-1 ${drop ? '' : 'hidden'}`}>
                <p className="text-sm hover:underline cursor-pointer">HP</p>
                <p className="text-sm hover:underline cursor-pointer">HP</p>
                <p className="text-sm hover:underline cursor-pointer">HP</p>
                <p className="text-sm hover:underline cursor-pointer">HP</p>
                <p className="text-sm hover:underline cursor-pointer">HP</p>

            </div>
        </div>
    );
};

export default FilterOptions;
