import React from 'react';
import Item from "@/conponents/Slider/Item";
import SkeletonItem from "@/conponents/Slider/SkeletonItem";
import {sendRequest} from "@/utils/apis";
import {auth} from "@/auth";

async function SliderItems() {
    const session = await auth()

    const data = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/product/random`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        queryParams: {
           quantity: 8
        },
        nextOption: {
            next: {tags: ['list-product-sale']}
        }
    });

    return (
        <div className="flex space-x-10 overflow-x-auto scrollbar">
            {data ? (
                data.data.map(item => (<Item item={item}/>))
            ) : (
                <>
                   <SkeletonItem/>
                </>
            )}
        </div>
    );
}

export default SliderItems;