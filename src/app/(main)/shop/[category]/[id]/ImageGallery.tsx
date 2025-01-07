'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex w-[45%] pr-8">
            <div className="relative flex flex-col">
                <div
                    id="thumbnail-container"
                    className="flex flex-col space-y-4 mr-4 h-[500px] overflow-y-auto scrollbar-hide"
                >
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`Product thumbnail ${index + 1}`}
                                className="object-cover p-2 hover:scale-105 transition-transform"
                                fill
                                sizes="96px"
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative w-[500px] h-[500px]">
                <Image
                    src={images[selectedImage]}
                    alt={`Product image ${selectedImage + 1}`}
                    className="object-cover rounded-lg p-4 border"
                    fill
                    sizes="500px"
                    priority
                />
            </div>
        </div>
    );
};

export default ImageGallery;