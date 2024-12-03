import Image from "next/image";
import ActionMethod from "@/app/conponents/actionMethod";
import Rate from "@/app/conponents/Rate";

export default function ProductListItem() {
    return (
        <div className="grid grid-cols-6 text-center items-center border-b-2 py-4 last:boder-b-0">
            <div className="flex space-x-2">
                <Image src="/img/item.png" alt={""} width={50} height={50} className="bg-gray-100 p-2"/>
                <h3 className="text-left">Console Pad X-Box</h3>
            </div>
            <p>$195.00</p>
            <div>
                <p className="text-sm">486 item left</p>
                <p className="font-light text-sm">1256 sold</p>
            </div>
            <p>Console</p>
            <Rate/>
            <ActionMethod/>
        </div>
    );
}
