import React, { useState } from 'react';

function Popup() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <div>
            {/* Button to open the modal */}
        <button
    onClick={openModal}
    className="px-4 py-2 bg-blue-500 text-white rounded"
        >
        Open Popup
    </button>

    {/* Modal */}
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-semibold">This is a Popup</h2>
    <p className="mt-2 text-gray-600">This is a simple modal using Tailwind CSS.</p>
    <div className="mt-4 flex justify-end">
    <button
        onClick={closeModal}
        className="px-4 py-2 bg-red-500 text-white rounded"
            >
            Close
            </button>
            </div>
            </div>
            </div>
    )}
    </div>
);
}

export default Popup;
