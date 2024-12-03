import React from 'react';
import Timer from "@/app/conponents/Slider/Timer";
import {Times} from "@/app/model";
import RoundButtonDirection from "@/app/conponents/Button/RoundButtonDirection";
import SliderItems from "@/app/conponents/Slider/SliderItems";
import ViewAllButton from "@/app/conponents/Button/ViewAllButton";

interface ChildProps {
    title: string,
    descibe: string,
    time?: boolean,
    titleButton?: string
}

const Slider: React.FC<ChildProps> = (props) => {

    const time: Times = {
        days: 12,
        hours: 1,
        minutes: 1,
        seconds: 2
    }
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <div className="w-8 h-12 bg-red-500 rounded"></div>
                <h2 className="text-red-500 ml-4">{props.title}</h2>
            </div>
            <div className="my-4 flex flex-row justify-between items-center">
                <h1 className="text-4xl text-black font-bold">{props.descibe}</h1>

                {props.time && <Timer time={time}></Timer>}
                <div className="flex space-x-3">
                    <RoundButtonDirection left></RoundButtonDirection>
                    <RoundButtonDirection></RoundButtonDirection>
                </div>
            </div>
            <SliderItems/>
            <div className="my-10 self-center ">
                {props.titleButton && <ViewAllButton title={props.titleButton}></ViewAllButton>}
            </div>
            <hr/>
        </div>
    );
};

export default Slider;