import React from 'react';

function Popup({
                   isOpen,
                   closeModal,
                   title,
                   buttonText,
                   onConfirm,
                   onCancel,
                   children, // Nhận children từ props
               }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 top-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg">
                {/* Tiêu đề của Popup */}
                {title && <h2 className="text-lg font-semibold">{title}</h2>}

                {/* Nội dung chính của Popup */}
                <div className="mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Popup;
