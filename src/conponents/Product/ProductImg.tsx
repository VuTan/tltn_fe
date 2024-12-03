import Image from "next/image";
import React from "react";

const ProductImg = () => {
    return (
        <>
            <div className="flex flex-col items-center space-y-4 w-1/4">
                <div className="bg-gray-100 p-4">
                    <Image className=""
                           src="/img/item.png" alt="asdasd" height={125}
                           width={125}/>
                </div>
                <div className="bg-gray-100 p-4">
                    <Image className=""
                           src="/img/item.png" alt="asdasd" height={125}
                           width={125}/>
                </div>
                <div className="bg-gray-100 p-4">
                    <Image className=""
                           src="/img/item.png" alt="asdasd" height={125}
                           width={125}/>
                </div>
                <div className="bg-gray-100 p-4">
                    <Image className=""
                           src="/img/item.png" alt="asdasd" height={125}
                           width={125}/>
                </div>
            </div>
            <div className="flex flex-col w-3/4 justify-center items-center bg-gray-100">
                <Image className=""
                       src="/img/item.png" alt="asdasd" height={400}
                       width={400}/>
            </div>
        </>
    );
}
export default ProductImg;
