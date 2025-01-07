'use client'
import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import TrashButton from "@/conponents/Button/TrashButton";

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "GEEKOM XT12 Pro Mini PC, 12th Gen Intel i7-12650H Mini Computer(10C/16T) 32GB DDR4/1TB PCIe 4 SSD",
            price: 492.00,
            image: "/api/placeholder/150/150"
        },
        {
            id: 2,
            name: "Mini PC Gaming PC, Desktop Computer with Intel 12th Gen Alder Lake N95",
            price: 159.00,
            image: "/api/placeholder/150/150"
        },
        {
            id: 3,
            name: "HP Pro Mini 400 G9 Business Mini PC Desktop Computer",
            option: "16GB DDR4 RAM, 1TB PCIe SSD",
            price: 508.99,
            image: "/api/placeholder/150/150"
        }
    ]);

    const removeFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon  icon={faHeart} className="w-6 h-6 text-red-500"/>
                    <h1 className="text-2xl font-semibold">Your Wishlist</h1>
                </div>
                {wishlistItems.length > 0 && (
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4"/>
                        <span>Add All to Cart</span>
                    </button>
                )}
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                    <FontAwesomeIcon  icon={faHeart} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="flex gap-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <h3 className="font-medium">{item.name}</h3>
                                        {item?.option && (
                                            <p className="text-sm text-gray-600">Option: {item?.option}</p>
                                        )}
                                        <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="text-gray-400 hover:text-red-500 h-fit"
                                    >
                                       <TrashButton/>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;