import React from "react";
import Filter from "@/app/(main)/shop/[category]/Filter";
import ContentShop from "@/app/(main)/shop/[category]/Content";
import {sendRequest} from "@/utils/apis";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const ShopPage = async (props: IProps) => {
    const {category} = props.params;
    const subcategory = props?.searchParams?.subcategory;

    const categoryData = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/category/find`,
        method: "GET",
        queryParams: {
            title: category,
        },
    })

    let productsData;
    if (!subcategory) {
        productsData = await sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/category/${category}/products`,
            method: "GET",
        })
    } else {
        productsData = await sendRequest<IBackendRes<any>>({
            url: `http://localhost:8080/api/category/${category}`,
            method: "GET",
            queryParams: {
                subcategory: subcategory,
            },
        })
    }
    return (
        <div className="flex overflow-hidden space-x-4 mb-2 h-[calc(100vh-129px)]">
            <div className="w-1/5 p-4 border-r-2 overflow-auto">
                <Filter category={categoryData?.data[0]}/>
            </div>
            <div className="w-4/5 overflow-auto">
                <ContentShop category={category} products={productsData?.data}/>

            </div>
        </div>
    );
}
export default ShopPage;
