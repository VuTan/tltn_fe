import React from 'react';

interface Rate {
    star: string;
    rate: number
}

function ProcessBar() {
    const rate: Rate[] = [
        {star: "5", rate: 60},
        {star: "4", rate: 20},
        {star: "3", rate: 10},
        {star: "2", rate: 8},
        {star: "1", rate: 2}];
    const totalRate = rate.reduce((total, current) => total + current.rate, 0);

    return (
        <div>
            {rate.map((star) => (
                <div key={star.star} className="flex items-center mb-2">
                    <p className="text-black w-12"> {star.star} star</p>
                    <div className="mx-4 grow border-[1px] border-black rounded h-6 relative">
                        <div
                            className="bg-yellow-500 h-full rounded"
                            style={{width: `${(star.rate / totalRate) * 100}%`}}
                        />
                    </div>
                    <p className="text-black w-12">{Math.round((star.rate / totalRate) * 100)}%</p>
                </div>
            ))}
        </div>
    );
}

export default ProcessBar;