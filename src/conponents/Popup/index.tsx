"use client";

import React from "react";
import ProductForm from "@/conponents/Product/FromDetailProduct";
import OrderItemForm from "@/conponents/Order/FormOrderItem";
import OrderForm from "@/conponents/Order/FormOrder";

const Modal = ({open, onClose, data, type, session}) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
            onClick={onClose} // Đóng modal khi click ra ngoài
        >
            <div
                className="max-w-[850px] bg-white rounded-lg shadow-lg relative p-8 max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi click vào nội dung bên trong
            >
                {/* Nút Close */}
                <button
                    className="absolute top-2 right-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-400"
                    onClick={onClose}
                >
                    ✕
                </button>
                {type === 'product' && (
                    <ProductForm data={data}/>
                )}
                {type === 'order-item' && (
                    <OrderItemForm session={session} data={data}/>
                )}
                {type === 'order' && (
                    <OrderForm session={session} data={data} onClose={onClose}/>
                )}
            </div>
        </div>
    );
};

export default Modal;
