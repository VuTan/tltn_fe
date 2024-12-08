import React from 'react'
import Image from "next/image";

type PropType = {
    selected: boolean
    index: number
    onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, index, onClick } = props

    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number"
            >
                <Image src={index} alt="" width={500} height={500}/>
            </button>
        </div>
    )
}
