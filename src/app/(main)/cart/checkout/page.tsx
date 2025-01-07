'use client'
import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {sendRequest} from "@/utils/apis";
import {useSelector} from "react-redux";

const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart);
    const {data: session} = useSession();
    const email = session?.user?.email;
    const [userData, setUserData] = useState()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });

    console.log(cart)
    const orderItems = cart.cartArr
    useEffect(() => {
        // Đảm bảo rằng email đã được xác định
        if (email) {
            const fetchUserData = async () => {
                try {
                    const userData = await sendRequest<IBackendRes<any>>({
                        url: `http://localhost:8080/api/users/${email}`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session?.user?.access_token}`,
                        },
                    });
                    setUserData(userData.data)
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [email, session?.user?.access_token]);

    useEffect(() => {
        if (userData) {
            setFormData({
                fullName: userData?.name || '',
                email: userData?.email || '',
                phone: userData?.phone || '',
                address: userData?.delivery_address || '',
            });
        }
    }, [userData]);


    const shippingFee = 30000;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const calculateTotal = () => {
        const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return subtotal + shippingFee;
    };

    return (
        <div className="py-24 bg-gray-50 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shipping Information Form */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4">
                            {orderItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center gap-4 space-y-2">
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <span className="font-medium line-clamp-1">{item.name}</span>
                                            {item.option && (
                                                <div className='font-light text-gray-500 text-sm'>
                                                    Option: {item.option.type}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-500">x{item.quantity}</span>

                                    </div>
                                    <span className="font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                  </span>
                                </div>
                            ))}

                            <div className="border-t border-gray-200 my-4"/>

                            <div className="flex justify-between items-center text-gray-600">
                                <span>Discount</span>
                                <span>${(cart.cartTotalAmount * 20 / 100).toFixed(2)}</span>
                            </div>

                            <div className="border-t border-gray-200 my-4"/>

                            <div className="flex justify-between items-center font-semibold text-lg">
                                <span>Total</span>
                                <span>${(cart.cartTotalAmount - cart.cartTotalAmount * 20 / 100).toFixed(2)}</span>
                            </div>

                            <div className="mt-6 bg-gray-50 p-4 rounded-md">
                                <p className="text-sm text-gray-600 text-center">
                                    Payment will be collected upon delivery (Cash on Delivery)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;