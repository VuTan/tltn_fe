"use client";

import React from "react";

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
            onClick={onClose} // Đóng modal khi click ra ngoài
        >
            <div
                className="w-full max-w-[700px] bg-white rounded-lg shadow-lg relative p-8 max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi click vào nội dung bên trong
            >
                {/* Nút Close */}
                <button
                    className="absolute top-2 right-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-400"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
