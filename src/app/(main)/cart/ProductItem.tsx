import Image from "next/image";
import QuantityButton from "@/app/conponents/Button/QuantityButton";
import TrashButton from "@/app/conponents/Button/TrashButton";

export default function ProductCartItem() {

    return (
        <div className="flex">
            <div className="bg-gray-100 p-4 rounded-lg">
                <Image src="/img/item.png" alt="product" width={100} height={100}/>
            </div>
            <div className="flex flex-col ml-4 justify-between">
                <div>
                    <p className="text-black text-lg font-bold">Havic HV G-92 Gamepad</p>
                    <p className="text-black text-sm font-extralight">Color</p>
                    <p className="text-black text-sm font-extralight">Size</p>
                </div>
                <p className="text-black text-lg font-bold">$ 192.00</p>
            </div>
            <div className="flex flex-col justify-between items-end ml-auto">
                <TrashButton></TrashButton>
                <QuantityButton></QuantityButton>
            </div>
        </div>
    )
}
