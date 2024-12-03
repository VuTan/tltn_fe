'use client'
import React, {useState} from "react";

const Spec = ({data}) => {
    const [showAll, setShowAll] = useState(false);

    const handleSeeMore = () => {
        setShowAll(!showAll); // Khi nhấn "See More", sẽ đảo trạng thái
    };
    return (
        <div
            className={`overflow-hidden transition-max-height ease-in-out duration-1000 ${showAll ? 'max-h-[1000px]' : 'max-h-32'}`}
        >
            {data?.map((item, index) => {
                return (<div className="flex mt-1">
                    <p className="list-disc text-sm font-semibold text-nowrap" key={index}>{item.spec}:</p>
                    <p className="list-disc text-sm mx-2" key={index}>{item.value}</p>
                </div>)
            })}
        </div>

    );
}
export default Spec;
