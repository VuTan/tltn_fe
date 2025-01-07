import Rate from "@/conponents/Rate";
import React from "react";
import ProcessBar from "@/conponents/Product/ProcessBar";
import Comment from "@/app/(main)/shop/[category]/[id]/Comment";
import {EmblaCarousel} from "@/conponents/Carousel/basic";
import {sendRequest} from "@/utils/apis";
import InfomationProduct from "@/app/(main)/shop/[category]/[id]/info";
import {Toaster} from "react-hot-toast";
import ImageGallery from './ImageGallery';

const ProductPage = async ({params}: { params: { id: string } }) => {
    const data = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/product/${params?.id}`,
        method: "GET",
    })

    return (
        <div className="flex flex-col p-24">
            <Toaster/>
            <div className="flex w-full mx-auto">
                <ImageGallery images={data?.data.imgs} />
                <InfomationProduct data={data}/>
            </div>
            <div className="mt-16">
                <EmblaCarousel/>
                <div className="mt-16 grid grid-cols-4 grid-rows-2 gap-6">
                    <div className="flex flex-col row-span-2 space-y-1">
                        <p className="text-black text-lg font-bold">Customer Reviews</p>
                        <div className="flex">
                            <Rate></Rate>
                            <p className="text-gray-600">(100)</p>
                        </div>
                        <ProcessBar></ProcessBar>
                    </div>
                    <div className="col-span-3 row-span-2">
                        <Comment></Comment>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;