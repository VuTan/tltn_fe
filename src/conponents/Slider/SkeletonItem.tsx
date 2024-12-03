import React from 'react';
import ImgItem from "@/conponents/Slider/ImgItem";
import Rate from "@/conponents/Rate";
import {Skeleton} from "@nextui-org/skeleton";
import {Card} from "@nextui-org/card";


function SkeletonItem() {

    return (
        <div className="flex flex-col">
            <Skeleton className="rounded-lg">
                <div className="w-60 h-60 rounded-lg bg-gray-300"></div>
            </Skeleton>
            <div className="mt-2 space-y-2">
                <Skeleton className="rounded-lg">
                    <div className="h-4 rounded-lg bg-gray-300"></div>
                </Skeleton>
                <Skeleton className="w-3/6 rounded-lg">
                    <div className="h-4 rounded-lg bg-gray-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-4 rounded-lg bg-gray-300"></div>
                </Skeleton>
            </div>
        </div>
    );
}

export default SkeletonItem;