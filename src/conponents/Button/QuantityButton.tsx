import React from "react";

const QuantityButton = ({notRemove, quantity, onQuantityChange}) => {

    const increment = () => {
        const newQuantity = quantity + 1;
        onQuantityChange(newQuantity); // Gửi giá trị mới lên cha
    };

    const decrement = () => {
        var newQuantity;
        if (!notRemove) {
            newQuantity = quantity - 1;
        } else
            newQuantity = quantity > 1 ? quantity - 1 : 1; // Không cho giảm dưới 1
        onQuantityChange(newQuantity); // Gửi giá trị mới lên cha
    };

    return (
        <div className="flex justify-between min-w-40">
            <div
                className="group border-2 rounded-l-lg text-black p-1 px-4 text-center text-2xl cursor-pointer select-none hover:bg-red-500"
                onClick={decrement}
            >
                -
            </div>
            <div className="border-y-2 text-black text-center p-2 grow select-none">
                {quantity}
            </div>
            <div
                className="group border-2 rounded-r-lg text-black p-1 px-[0.90rem] text-center text-2xl cursor-pointer select-none hover:bg-red-500"
                onClick={increment}
            >
                +
            </div>
        </div>
    );
};

export default QuantityButton;
