import React from "react";

interface ChildProps {
    left?: boolean
}


const RoundButtonDirection: React.FC<ChildProps> = ({left}) => {
    return (
        <div className=" flex bg-gray-400 size-8 rounded-full cursor-pointer">
            <p className="m-auto text-2xl"> {left ? '<' : '>'} </p>
        </div>
    );
};

export default RoundButtonDirection;