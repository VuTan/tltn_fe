'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {EmblaOptionsType} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {Thumb} from './thumbnailsButton'
import './thumbnail.css'
import Image from "next/image";

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const ThumbnailsCarousel: React.FC<PropType> = (props) => {

    const {slides, options} = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()

        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="thumbnails flex">
            {slides?.length > 1 && (
                <div className="thumbnails-thumbs flex flex-col">
                    <div className="thumbnails-thumbs__viewport" ref={emblaThumbsRef}>
                        <div className="thumbnails-thumbs__container ">
                            {slides?.map((index) => (
                                <Thumb
                                    key={index}
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    index={<div>
                                        <Image src={index} alt={""} width={75} height={75}/>
                                    </div>}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="thumbnails__viewport" ref={emblaMainRef}>
                <div className="thumbnails__container">
                    {slides?.map((index) => (
                        <div className="thumbnails__slide" key={index}>
                            <div className="thumbnails__slide__number">
                                <Image src={index} alt={""} width={700} height={700}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default ThumbnailsCarousel
