'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { Options } from "@/models/Product";

interface OptionsRadioProps {
    options: Options[];
    onOptionChange: (option: Options) => void;
}

export default function OptionsRadio({ options, onOptionChange }: OptionsRadioProps) {
    const [selected, setSelected] = useState<Options | null>(options.length > 0 ? options[0] : null);
    const [showAll, setShowAll] = useState(false); // State để kiểm soát hiển thị

    const handleChange = (selectedValue: string) => {
        const selectedOption = options.find((option) => option.type === selectedValue);
        if (selectedOption) {
            setSelected(selectedOption);
            onOptionChange(selectedOption);
        }
    };

    const visibleOptions = showAll ? options : options.slice(0, 4); // Hiển thị tối đa 5 option nếu không bật "See more"

    return (
        <div>
            <RadioGroup
                className="flex flex-wrap gap-4"
                value={selected?.type}
                onChange={handleChange}
            >
                {visibleOptions.map((item, index) => (
                    <Radio
                        key={index}
                        value={item.type}
                        className="group p-2 flex flex-col justify-between items-start border-[1px] border-black select-none
                            cursor-pointer rounded-lg data-[checked]:border-blue-700 data-[checked]:border-2 basis-[200px]"
                    >
                        <div className="border-b-[1px] w-full">
                            <p className="truncate">{item.type}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <p>${item.price}</p>
                            <p className="text-sm text-nowrap">Stock: {item.stock}</p>
                        </div>
                    </Radio>
                ))}
            </RadioGroup>

            {/* Nút See More */}
            {options.length > 4 && (
                <button
                    onClick={() => setShowAll(!showAll)} // Toggle trạng thái
                    className="mt-4 text-blue-500 hover:underline"
                >
                    {showAll ? 'See less' : 'See more'}
                </button>
            )}
        </div>
    );
}
