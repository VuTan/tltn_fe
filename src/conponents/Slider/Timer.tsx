'use client';
import React, {useEffect, useState} from 'react';
import {Times} from "@/app/model";

interface ChildProps {
    time: Times
}

const Slider: React.FC<ChildProps> = ({time}) => {
    const [seconds, setSeconds] = useState(time.seconds);
    const [minutes, setMinutes] = useState(time.minutes);
    const [hours, setHours] = useState(time.hours);
    const [days, setDays] = useState(time.days);
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    if (minutes > 1) {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        return 59;
                    }
                    if (hours > 1) {
                        setHours(prevHours => prevHours - 1);
                        setMinutes(59);
                        return 59;
                    }
                    if (days > 1) {
                        setDays(days - 1);
                        setHours(23);
                        setMinutes(59);
                        return 59;
                    }
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    },);

    return (
        <div className="flex flex-col justify-items-center">
            <div className="flex items-center ">
                <div className="mx-4 min-w-14">
                    <h3 className="font-bold">Day</h3>
                    <h3 className="font-bold text-3xl">{days}</h3>

                </div>
                <span className="text-chestnut-500 mx-1 text-xl font-bold">:</span>
                <div className="mx-4 min-w-14">
                    <h3 className="font-bold">Hours</h3>
                    <h3 className="font-bold text-3xl">{hours}</h3>
                </div>
                <span className="text-chestnut-500 mx-1 text-xl font-bold">:</span>
                <div className="mx-4 min-w-14">
                    <h3 className="font-bold">Minutes</h3>
                    <h3 className="font-bold text-3xl">{minutes}</h3>
                </div>
                <span className="text-chestnut-500 mx-1 text-xl font-bold">:</span>
                <div className="mx-4 min-w-14">
                    <h3 className="font-bold">Seconds</h3>
                    <h3 className="font-bold text-3xl">{seconds}</h3>
                </div>
            </div>

        </div>
    );
}

export default Slider;