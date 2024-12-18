'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {sendRequest} from "@/utils/apis";
import {useSession} from "next-auth/react";
import dayjs from "dayjs";
import CustomizedTimeline from "@/conponents/TimeLine";

export default function OrderItemForm({data}) {
    const session = useSession()
    const [order, setOrder] = useState()

    const fetchOrder = async (data: string) => {
        try {
            const response = await sendRequest<IBackendRes<any>>({
                url: `http://localhost:8080/api/order-item/${data}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.data?.user?.access_token}`,
                },
            });

            const orderDetail = response.data;
            return orderDetail;
        } catch (error) {
            console.error("Failed to fetch order detail:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const orderDetail = await fetchOrder(data);
            setOrder(orderDetail);
        };

        fetchData(); // Gọi hàm async
    }, [session]);


    console.log(order)


    return (
        <div className='text-center w-[500px]'>
            <div className="flex items-center">
                <h3 className="text-blue-600 text-xl font-bold flex-1">Order Detail</h3>
            </div>
            <div className='flex space-x-6'>
                <Image
                    src={order?.product_id?.imgs[0]} // Use dynamic image URL or fallback
                    alt={order?.product_id?.name} // Set dynamic alt text
                    width={150}
                    height={150}
                    style={{
                        width: "150px",
                        height: "150px",
                    }}
                />
                <div className='w-full'>
                    <label className="text-left font-bold text-gray-800  mb-2 block">
                        Name of the product
                    </label>
                    <textarea
                        name="name"
                        placeholder="Write about the product"
                        className={`px-4 w-full py-3 bg-gray-100 text-gray-800  border-none focus:outline-blue-600 focus:bg-transparent rounded-lg`}
                        rows="5"
                        value={order?.product_id?.name}
                    />
                </div>
            </div>

            <div className='flex w-full space-x-4 justify-between'>
                <div className='flex text-left'>
                    <p className='font-bold text-gray-800  mr-3'>Name:</p>
                    <p className={`text-gray-800  border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        name name
                    </p>
                </div>
                <div className='flex text-left'>
                    <p className='font-bold text-gray-800  mr-3'>Email:</p>
                    <p className={`text-gray-800  border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        mail@gmail.com
                    </p>
                </div>
            </div>

            <div className='flex space-x-4 justify-center'>
                <div className='flex w-full justify-between'>
                    <p className='font-bold text-gray-800'>Phone:</p>
                    <p className={`text-gray-800 border-none
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        (723) 732-760-5760
                    </p>
                </div>
            </div>

            <div className='flex space-x-4 justify-center'>
                <div className='flex w-full justify-between'>
                    <p className='font-bold text-gray-800 text-nowrap'>Shipping Address:</p>
                    <p className={`text-gray-800 border-none text-wrap text-right
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        Wilson's Jewelers LTD 1344 Hershell Hollow Road, Tukwila, WA 98168, United States
                    </p>
                </div>
            </div>

            <div className='flex space-x-4 justify-center s'>
                <div className='flex w-full justify-between'>
                    <p className='font-bold text-gray-800  mr-3'>Created At:</p>
                    <p className={`text-gray-800 border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        {dayjs(order?.createdAt).format('DD/MM/YYYY, HH:mm:ss')}
                    </p>
                </div>
            </div>

            <div className='w-full p-0 right-0'>
                <CustomizedTimeline order={order}/>
            </div>
            <br/>

            {order?.option && (
                <div className='flex space-x-4 justify-center s'>
                    <div className='flex w-full justify-between'>
                        <p className='font-bold text-gray-800  mr-3'>Options:</p>
                        <p className={`text-gray-800 border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                            {order?.option?.type}
                        </p>
                    </div>
                </div>
            )}

            <div className='flex space-x-4 justify-center'>
                <div className='flex w-full  justify-between'>
                    <p className=' font-bold text-gray-800  mr-3'>Price:</p>
                    <p className={`text-gray-800  border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        ${order?.option?.price}
                    </p>
                </div>
            </div>
            <div className='flex space-x-4 justify-center'>
                <div className='flex w-full  justify-between'>
                    <p className=' font-bold text-gray-800  mr-3'>Quantity:</p>
                    <p className={`text-gray-800  border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        {order?.quantity}
                    </p>
                </div>
            </div>
            <hr/>
            <div className='flex space-x-4 justify-center'>
                <div className='flex w-full  justify-between'>
                    <p className=' font-bold text-gray-800  mr-3'>Total:</p>
                    <p className={`text-gray-800  border-none 
                                           focus:outline-blue-600 focus:bg-transparent rounded-lg`}>
                        ${order?.total_price}
                    </p>
                </div>
            </div>

        </div>
    );
}