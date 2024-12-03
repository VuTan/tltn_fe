'use client'
import {Radio, RadioGroup} from '@headlessui/react'
import {useState} from 'react'

// Mảng màu
const colors = ['Red', 'Blue', 'Green', 'Yellow']

export default function ColorRadio() {
    const [selected, setSelected] = useState(colors[0])

    return (
        <RadioGroup className="flex items-center ml-4 space-x-2" value={selected} onChange={setSelected}>
            {colors.map((color, index) => (
                <Radio key={index} value={color}
                       className="group flex justify-center items-center bg-red-500
                       cursor-pointer rounded-full size-5 data-[checked]:border-2 data-[checked]:border-black"
                >
                </Radio>
            ))}
        </RadioGroup>
    )
}
