import SkeletonItem from "@/conponents/Slider/SkeletonItem";
import React from "react";
import Product from "@/app/(main)/shop/[category]/Product";

const ContentShop = (props: any) => {
    const {isLoading, products, category} = props
    return (
        <>
            <div
                className="py-4 justify-items-center items-center">
                {isLoading && (
                    <>
                        {Array.from({length: 3}).map((_, index) => (
                            <SkeletonItem key={index}/>
                        ))}
                    </>
                )}

                {products?.map((item) => (
                    <Product key={item.id} category={category} data={item}/>
                ))}


            </div>
        </>
    );
}
export default ContentShop;
