import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface ChildProps {
    icon: IconProp;
    category: string;
    link: string;
}


const ItemCategory: React.FC<ChildProps> = (props) => {
    return (
        <Link href={`/shop/${props.link}`}>
            <div
                className="flex flex-col space-y-6 justify-center items-center min-w-48 min-h-48 border-2 rounded-lg group  hover:bg-red-500">

                <div>
                    <FontAwesomeIcon icon={props.icon} className="text-black size-12 group-hover:text-white"/>
                </div>
                <p className="text-2xl text-black group-hover:text-white">{props.category}</p>
            </div>
        </Link>
    );
}

export default ItemCategory;