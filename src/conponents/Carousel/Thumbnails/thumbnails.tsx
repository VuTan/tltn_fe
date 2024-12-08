'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {EmblaOptionsType} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {Thumb} from "@/conponents/Carousel/Thumbnails/thumbnailsButton";
import Image from 'next/image'
import './thumbnail.css'

type PropType = {
    slides: string[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
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

    console.log()

    return (
        <div className="thumbnails">
            <div className="thumbnails__viewport" ref={emblaMainRef}>
                <div className="thumbnails__container">
                    {slides.map((items) => (
                        <div className="thumbnails__slide" key={items}>
                            <div className="thumbnails__slide__number">
                                <Image src={items} alt="" layout="fill" objectFit="cover" quality={100}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="thumbnails-thumbs">
                <div className="thumbnails-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="thumbnails-thumbs__container">
                        {slides.map((items, index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={items}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
