import Image from "next/image";
import ActionMethod from "@/app/conponents/actionMethod";
import Rate from "@/app/conponents/Rate";
import Link from "next/link";
import OrderStatus from "@/app/admin/(user)/seller/detail/OrderStatus";

export default function OrderListItem() {
    return (
        <div className="grid grid-cols-8 text-center items-center border-b-2 py-4 last:boder-b-0">
            <p className="text-left">#00112233</p>
            <p>Apr 23 , 2024</p>
            <Link href="#" className="text-blue-400">Gail C. Anderson</Link>
            <p>$1.256.00</p>
            <p>6</p>
            <p>6</p>
            <div className="flex justify-center"><OrderStatus/></div>
            <ActionMethod/>
        </div>
    );
}
