'use client'
import {RangeSlider} from 'next-range-slider';
import {useState} from "react";
import 'next-range-slider/dist/main.css';

const PriceRangeSlider = () => {
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(1000);
    return (
        <>
            <p className="text-black text-xl font-bold">Price range</p>
            <RangeSlider
                min={0}
                max={1000}
                step={10}
                options={{
                    leftInputProps: {
                        value: low,
                        onChange: (e) => setLow(Number(e.target.value)),
                    },
                    rightInputProps: {
                        value: high,
                        onChange: (e) => setHigh(Number(e.target.value)),
                    },
                    thumb: {
                        width: "1.25rem",
                        height: "1.25rem",
                        background: "#000000"
                    },
                    track: {
                        height: "8px"
                    },
                    range: {
                        background: "#000000"
                    }
                }}

            />
            <div className="flex justify-between mt-0 p-0">
                <p className="text-black">
                    {low} $
                </p>
                <p className="text-black">
                    {high} $
                </p>
            </div>
        </>
    );
}
export default PriceRangeSlider;