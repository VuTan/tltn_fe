'use client'
import {useState} from "react";

const QuantityButton = () => {

    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }


    const decrement = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity === 1) {
                return 1;
            }
            return prevQuantity - 1;
        });
    };


    return (
        <div className="flex justify-between min-w-40">
            <div className="group border-2 rounded-l-lg text-black p-1 px-4 text-center text-2xl cursor-pointer select-none hover:bg-red-500" onClick={decrement}>-</div>
            <div className="border-y-2 text-black text-center p-2 grow select-none">{quantity}</div>
            <div className="group border-2 rounded-r-lg text-black p-1 px-[0.90rem] text-center text-2xl cursor-pointer select-none hover:bg-red-500" onClick={increment}>+</div>
        </div>
    );
};

export default QuantityButton;