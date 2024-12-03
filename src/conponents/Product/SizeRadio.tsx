'use client'
import {Radio, RadioGroup} from '@headlessui/react'
import {useState} from 'react'

// Mảng màu
const colors = ["XS", "S", "M", "L", "XL"]

export default function SizeRadio() {
    const [selected, setSelected] = useState(colors[0])

    return (
        <RadioGroup className="flex items-center ml-8 space-x-5" value={selected} onChange={setSelected}>
            {colors.map((color, index) => (
                <Radio key={index} value={color}
                       className="group flex justify-center items-center border-[1px] border-black select-none
                       cursor-pointer rounded-lg size-9 data-[checked]:bg-red-500 data-[checked]:border-red-500 "
                >
                    <p className="text-black">{color}</p>
                </Radio>
            ))}
        </RadioGroup>
    )
}
