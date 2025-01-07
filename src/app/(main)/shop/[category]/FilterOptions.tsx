'use client'
import React, {useEffect, useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const FilterOptions = (props: any) => {
    const {title, data, key} = props;
    const [drop, setDrop] = useState(false);
    const [sort, setSort] = useState(0)

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleDrop = () => {
        setDrop(!drop);
    };

    useEffect(() => {
        handleChangePage()
    }, [sort]);

    const handleChangePage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', sort);
        replace(`${pathname}?${params.toString()}`);

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
                {title === 'Sort By' ? (
                    data?.map((item, index) => (
                        <a
                            onClick={() => setSort(index)}
                            key={index}
                            className="text-md font-normal hover:underline cursor-pointer"
                        >
                            {item}
                        </a>
                    ))
                ) : (
                    data?.map((item, index) => (
                        <a
                            href={`/shop/${title}?subcategory=${item}`}
                            key={index}
                            className="text-md font-normal hover:underline cursor-pointer"
                        >
                            {item}
                        </a>
                    ))
                )}
            </div>
        </div>
    )
        ;
};

export default FilterOptions;
