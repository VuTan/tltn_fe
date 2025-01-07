'use client'
import React, {useCallback, useEffect, useState} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './basic.css'
import Item from "@/conponents/Slider/item";
import RoundButtonDirection from "@/conponents/Button/RoundButtonDirection";
import {sendRequest} from "@/utils/apis";
import {useSession} from "next-auth/react";
import SkeletonItem from "@/conponents/Slider/SkeletonItem";

export function EmblaCarousel() {
    const session = useSession()
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, align: "center"})

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendRequest<IBackendRes<any>>({
                    url: `http://localhost:8080/api/product/random`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session?.data?.user?.access_token}`
                    },
                    queryParams: {
                        quantity: 8
                    },
                    nextOption: {
                        next: { tags: ['list-product-sale'] }
                    }
                });
                setData(response); // Gán dữ liệu nhận được vào state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [session]);

    return (
        <>
            <div className="flex justify-end space-x-2 mb-6">
                <button onClick={scrollPrev}>
                    <RoundButtonDirection left/>
                </button>
                <button onClick={scrollNext}>
                    <RoundButtonDirection/>
                </button>
            </div>
            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container">
                    {data ? (
                        data.data.map(item => (
                            <div className="embla__slide">
                                <Item item={item}></Item>
                            </div>
                        ))
                    ) : (
                        <>
                            <SkeletonItem/>
                        </>
                    )}


                </div>
            </div>

        </>
    )
}
