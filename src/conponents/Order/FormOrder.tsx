'use client'
import React from 'react';
import {faBarcode} from "@fortawesome/free-solid-svg-icons/faBarcode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons/faCalendar";
import {faBox} from "@fortawesome/free-solid-svg-icons/faBox";
import {faMoneyBillWave} from "@fortawesome/free-solid-svg-icons/faMoneyBillWave";
import Image from 'next/image'
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import OrderStatus from "@/app/admin/(user)/seller/detail/OrderStatus";


export default function OrderForm({data, onClose}) {

    console.log(data)
    const order = {
        _id: "ORD1234567890", // Mã đơn hàng
        createdAt: "2024-06-17T04:52:19.486Z", // Ngày tạo đơn hàng
        status: "Processing", // Trạng thái đơn hàng
        paymentMethod: "Credit Card", // Phương thức thanh toán
        deliveryMethod: "Express Shipping", // Phương thức giao hàng
        expectedDeliveryDate: "2024-06-20T04:52:19.486Z", // Ngày giao dự kiến
        shippingAddress: { // Địa chỉ giao hàng
            street: "123 Main Street",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "USA"
        },
        orderItems: [ // Danh sách sản phẩm
            {
                name: "Wireless Headphones",
                variant: "Black",
                quantity: 2,
                price: 99.99,
                image: "https://via.placeholder.com/50"
            },
            {
                name: "Smartwatch",
                variant: "Silver",
                quantity: 1,
                price: 199.99,
                image: "https://via.placeholder.com/50"
            },
            {
                name: "Laptop Stand",
                variant: "Aluminum",
                quantity: 1,
                price: 49.99,
                image: "https://via.placeholder.com/50"
            }
        ]
    };

    const calculateTotalPrice = () => {
        return data.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };


    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold">Order Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-2xl"/>
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="flex justify-between p-6 bg-gray-50">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 px-3 py-2 rounded-full">
                                <FontAwesomeIcon icon={faBarcode} className="text-blue-600"/>
                            </div>
                            <div>
                                <p className="text-gray-500">Order Number</p>
                                <p className="font-semibold">{data._id}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 px-3 py-2 rounded-full">
                                <FontAwesomeIcon icon={faCalendar} className="text-green-600"/>
                            </div>
                            <div>
                                <p className="text-gray-500">Order Date</p>
                                <p className="font-semibold">{formatDate(data.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <FontAwesomeIcon icon={faBox} className="mr-3 text-gray-600"/>
                            Order Items
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Quantity</th>
                                    <th className="p-3 text-right">Price</th>
                                    <th className="p-3 text-right">Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.orderItems.map((item, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3 flex items-center space-x-4">
                                            <Image
                                                src={item.product_id.imgs[0] || 'https://via.placeholder.com/50'}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <div>
                                                <p className="font-semibold text-xs">{item.product_id.name}</p>
                                                <p className="text-gray-500 text-sm">{item?.option?.type || 'Default'}</p>
                                            </div>
                                        </td>
                                        <td className="p-3 justify-items-center text-nowrap"><OrderStatus status={item.status[item.status.length - 1].title}/></td>
                                        <td className="p-3 text-center">{item.quantity}</td>
                                        <td className="p-3 text-right">${item?.option ? item.option.price : item.product_id.price}</td>
                                        <td className="p-3 text-right">${item.total_price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Order Totals */}
                    <div className="p-6 bg-gray-50 border-t">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600"/>
                                </div>
                                <div>
                                    <p className="text-gray-500">Payment Method</p>
                                    <p className="font-semibold">{order.paymentMethod || 'Credit Card'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex justify-between mb-2 space-x-4">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span>${data.total_price}</span>
                                </div>
                                <div className="flex justify-between mb-2 space-x-4">
                                    <span className="text-gray-600">Deliver fee:</span>
                                    <span>${data.delivery_fee}</span>
                                </div>
                                <div className="flex justify-between font-bold text-xl border-t pt-2 space-x-4">
                                    <span>Total:</span>
                                    <span>${data.total_price + data.delivery_fee}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg font-semibold">Shipping Address</p>
                                <p>{order.shippingAddress?.street}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
                                <p>{order.shippingAddress?.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}