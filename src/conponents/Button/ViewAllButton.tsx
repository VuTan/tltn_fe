import React from "react";
import Link from "next/link";


const ViewAllButton = ({title}) => {
    return (
        <Link href={'/shop'}>
            <div className="w-full text-center bg-red-500 p-2 rounded-lg">


                {title}
            </div>
        </Link>
    );
};

export default ViewAllButton;