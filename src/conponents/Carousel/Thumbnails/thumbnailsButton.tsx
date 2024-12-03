import React from 'react'
type PropType = {
    selected: boolean
    index: ChildNode
    onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, index, onClick } = props

    return (
        <div
            className={' thumbnails-thumbs__slide '.concat(
                selected ? ' thumbnails-thumbs__slide--selected ' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="thumbnails-thumbs__slide__number "
            >
                {index}
            </button>
        </div>
    )
}
