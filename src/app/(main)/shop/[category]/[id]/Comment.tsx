'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import Rate from "@/conponents/Rate";
import Image from "next/image";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

export default function Comment() {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <div className="flex bg-gray-300 rounded-full w-10 h-10 justify-center items-center">
                    <FontAwesomeIcon className="text-black size-4" icon={faUser}/>
                </div>
                <p className="ml-4 text-black">Dhruv Patel</p>
            </div>
            <div>
                <div className="flex mt-2 items-center">
                    <Rate></Rate>
                    <p className="text-black text-lg font-bold">Title here!</p>
                </div>
            </div>
            <p className="text-black text-xs font-extralight">January 30, 2022</p>
            <p className="text-black">I bought this keyboard about a year and a half ago and it is the best keyboard I
                have ever used. I have
                tried various keyboards and brands and the Apex Pro TKL is the best keyboard you will ever
                try.<br/><br/>
                Switches: The switches on this keyboard are buttery smooth and require no need to lubricate them because
                they feel like they already are. This keyboard has EXTREMELY fast switches and is great for gaming and
                especially any FPS games. The letters and numbers at the top of the keyboard are a switch that no other
                keyboard has, which is Omni Point adjustable Mechanical Switches. They are a white in color and can be
                adjusted by the OLED display menu at the top right of the keyboard or in the SteelSeries software.</p>
            <div className="mt-4 flex space-x-2">
                <Image src="/img/img.jpg" alt="" width={200} height={200}/>
                <Image src="/img/img.jpg" alt="" width={200} height={200}/>
                <Image src="/img/img.jpg" alt="" width={200} height={200}/>
            </div>
            <div className="flex mt-2 items-center">
                <div className="flex items-center ">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-gray-400 size-6"/>
                    <p className="ml-2 text-sm text-gray-400">2</p>
                </div>
                <div className="flex items-center ml-8">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-gray-400 size-6"/>
                    <p className="ml-2 text-sm text-gray-400">0</p>
                </div>
            </div>
        </div>
    )
}
