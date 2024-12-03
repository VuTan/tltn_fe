'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

interface Options {
    type: string;
    price: number;
    stock: number;
}

interface OptionsRadioProps {
    options: Options[];
    onOptionChange: (option: Options) => void;
}

export default function OptionsRadio({ options, onOptionChange }: OptionsRadioProps) {
    // Khởi tạo selected với null nếu không có option nào
    const [selected, setSelected] = useState<Options | null>(options.length > 0 ? options[0] : null);

    // Xử lý thay đổi khi người dùng chọn tùy chọn
    const handleChange = (selectedValue: string) => {
        // Tìm kiếm option từ selectedValue (type)
        const selectedOption = options.find((option) => option.type === selectedValue);

        if (selectedOption) {
            setSelected(selectedOption); // Cập nhật selected
            onOptionChange(selectedOption); // Truyền dữ liệu lên component cha
        }
    };

    return (
        <RadioGroup
            className="flex flex-wrap gap-4"
            value={selected?.type} // Sử dụng selected?.type để truyền giá trị cho RadioGroup
            onChange={handleChange} // Truyền handleChange vào onChange của RadioGroup
        >
            {options.map((item, index) => (
                <Radio
                    key={index}
                    value={item.type} // Gán giá trị value cho mỗi radio button
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
    );
}
