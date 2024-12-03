'use client';
import React, {useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/16/solid";

export interface DropdownLanguage {
    content: string,
    href: string,
    select: boolean
}

interface DropdownProps {
    items: DropdownLanguage[];
}

function Dropdown({items}: DropdownProps) {

    const initializeState = () => {
        const selectedItem = items.find(item => item.select === true);
        return selectedItem ? selectedItem : null;
    };

    const [selectedItem] = useState<DropdownLanguage | null>(initializeState);


    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    className="text-white pr-2 flex">
                    {selectedItem?.content}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 h-5 w-5 text-gray-400"/>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {items.map((value, index) => {
                        if (!value.select) {
                            return (
                                <MenuItem key={index}>
                                    <a
                                        href={value.href}
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    >
                                        {value.content}
                                    </a>
                                </MenuItem>
                            );
                        }
                        return null;
                    })}
                </div>

            </MenuItems>
        </Menu>
    );
}

export default Dropdown;