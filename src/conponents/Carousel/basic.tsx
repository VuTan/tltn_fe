'use client'
import React, {useCallback, useEffect} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './basic.css'
import Item from "@/conponents/Slider/item";
import RoundButtonDirection from "@/conponents/Button/RoundButtonDirection";

export function EmblaCarousel() {
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
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>
                    <div className="embla__slide">
                        <Item></Item>
                    </div>

                </div>
            </div>

        </>
    )
}
