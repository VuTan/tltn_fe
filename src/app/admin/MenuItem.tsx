'use client';
import { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";

interface MenuData {
    title: string;
    subMenu: string[];
}

export default function MenuItem({ menuData }: { menuData: MenuData }) { // Cập nhật kiểu cho props
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <li>
            <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex justify-between items-center focus:outline-none focus:bg-gray-200 hover:bg-gray-800"
            >
                <button className="w-full text-left py-3 px-4">
                    {menuData.title}
                </button>
                <FontAwesomeIcon
                    icon={isMenuOpen ? faCaretUp : faCaretDown}
                    className="px-4 py-3"
                />
            </div>
            <div
                className={`pl-4 space-y-2 overflow-hidden transition-[max-height] duration-500 ease-in-out ${isMenuOpen ? 'max-h-40' : 'max-h-0'}`}
            >
                {menuData.subMenu.map((item, index) => ( // Lặp qua mảng subMenu
                    <a key={index} href="#" className="block py-2 px-4 hover:bg-gray-200">
                        {item} {/* Hiển thị từng mục trong subMenu */}
                    </a>
                ))}
            </div>
        </li>
    );
}
